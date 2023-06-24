const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { Queue } = require('@datastructures-js/queue');


const PORT = process.env.PORT || 4000;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
});

// ------------------------ Settings ------------------------
const GUEST_ID_LENGTH = 6;
const GAME_ROOM_LENGTH = 5;
// ----------------------------------------------------------

// ------------------------ Server Information ------------------------
const activeUsers = new Set();
// map a user to their socket
const socketMap = new Map();
var playersOnline = 0;
const lobbyQueue = new Queue();
const usersInLobbyQueue = new Set();
// map a user to their active game
const gameMap = new Map();

// --------------------------------------------------------------------

let intervals = {};
io.on("connection", (socket) => {
    console.log("New client connected");
    const newUsername = addUser(socket);
    socketMap.set(newUsername, socket);

    intervals[socket.id] = setInterval(() => emitTestTime(socket), 1000);

    socket.on("JoinQueue", ({username}) => {
        joinQueue(username);
    });
    socket.on("LeaveQueue", ({username}) => {
        leaveQueue(username);
    })

    // disconnect a user
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(intervals[socket.id]);
        delete intervals[socket.id];

        removeUser(socket, newUsername);
        socketMap.delete(newUsername);

    });
});

// print server info for debugging
// setInterval(() => {
//     console.log("active users", activeUsers);
//     console.log("client mappings length:", clientMap.size);
// }, 3000)

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// ------------------------ Helpers ------------------------

/**
 * emits the current time
 */
const emitTestTime = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("TestTime", response);
};

/**
 * Add a new user
 */
function addUser(socket) {
    playersOnline++;
    var newUsername;
    do {
        newUsername = "guest-" + generateRandomName(GUEST_ID_LENGTH);
    } while (activeUsers.has(newUsername));

    activeUsers.add(newUsername);
    io.emit("OnlineCount", playersOnline);
    socket.emit("username", newUsername);
    return newUsername;
}

/**
 * Remove user
 * TODO: remove username and mapping
 */
function removeUser(socket, username) {
    playersOnline--;
    activeUsers.delete(username)
    io.emit("OnlineCount", playersOnline);
}

/**
 * Create a new guest username
 */
function generateRandomName(idLength) {
    let result = '';
    const characters = 'abcdefghjkmnpqrstuvwxyz23456789';
    for (let i = 0; i < idLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Add a user to queue, dequeue if enough for a match.
 */
function joinQueue(username) {
    lobbyQueue.push(username);
    usersInLobbyQueue.add(username);
    console.log("joined queue with username: ", username);

    if (usersInLobbyQueue.size > 1) {
        createGameRoom();
    }
}

/**
 * Allows a user to forcefully leave queue
 */
function leaveQueue(username) {
    usersInLobbyQueue.delete(username);
    console.log("left queue with username: ", username);
}

/**
 * Create a matching between 2 users.
 */
function createGameRoom() {
    var gameRoom = generateRandomName(GAME_ROOM_LENGTH);
    console.log("creating new room:", gameRoom);

    for (let pl = 0; pl < 2; ++pl) {
        while (!usersInLobbyQueue.has(lobbyQueue.front())) {
            lobbyQueue.pop();
        }
        let newPlayer = lobbyQueue.pop();
        usersInLobbyQueue.delete(newPlayer);

        gameMap.set(newPlayer, gameRoom);
        socketMap.get(newPlayer).emit("RoomAssigned", gameRoom);
        console.log("added player ", newPlayer, " to game room ", gameRoom);
    }
}