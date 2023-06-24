const express = require('express');
const cors = require('cors');
const http = require("http");
const socketIo = require('socket.io');

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
const GUEST_ID_LENGTH = 5;

// ----------------------------------------------------------

// ------------------------ Server Information ------------------------
const activeUsers = new Set();
// map a user to their socket
const clientMap = new Map();
var playersOnline = 0;

// --------------------------------------------------------------------

let intervals = {};
io.on("connection", (socket) => {
    console.log("New client connected");
    const newUsername = addUser(socket);
    clientMap.set(newUsername, socket);
    console.log(clientMap.get(newUsername).id);

    intervals[socket.id] = setInterval(() => emitTestTime(socket), 1000);

    // disconnect a user
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(intervals[socket.id]);
        delete intervals[socket.id];

        removeUser(socket, newUsername);
        clientMap.delete(newUsername);

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
        newUsername = generateGuestId(GUEST_ID_LENGTH);
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

function generateGuestId(idLength) {
    let result = 'guest-';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < idLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
