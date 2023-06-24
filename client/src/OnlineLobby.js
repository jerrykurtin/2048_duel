import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.1.231:4000";

function OnlineLobby() {
    const [response, setResponse] = useState("");
    const [playersOnline, setPlayersOnline] = useState(0);
    const [onlineStatus, setOnlineStatus] = useState("lobby");  // "lobby", "waiting", "privateWaiting", "inGame"
    const [username, setUsername] = useState("");
    const [socket, setSocket] = useState(null);
    const [room, setRoom] = useState(null);

    // start and end socket connnection
    useEffect(() => {
        const newSocket = socketIOClient(ENDPOINT);

        newSocket.on("TestTime", data => {
            console.log("response received!");
            setResponse(data);
        });

        newSocket.on("OnlineCount", (pOnline) => {
            console.log("new player");
            setPlayersOnline(pOnline);
        })

        newSocket.on("username", (newUsername) => {
            console.log("new username given: ", newUsername);
            setUsername(newUsername);
        })

        newSocket.on("RoomAssigned", (newRoom) => {
            console.log("room assigned!");
            setRoom(newRoom);
        })

        setSocket(newSocket);

        // clean up
        return () => newSocket.disconnect();
    }, []);

    /**
     * Join the random room queue
     */
    function joinQueue() {
        socket.emit("JoinQueue", {username: username});
        setOnlineStatus("waiting");
    }

    /**
     * leave the random room queue.
     */
    function leaveQueue() {
        socket.emit("LeaveQueue", {username: username});
        setRoom(null);
        setOnlineStatus("lobby");
    }

    function loadView(status) {
        if (status === "lobby") {
            return (<>
                <h1>Lobby</h1>
                <Button onClick={() => joinQueue()}>Join Random Match</Button>
                <Button>Start Local Match</Button>
                <Button>Join Local Match</Button>
            </>);
        }
        
        else if (status === "waiting") {
            return (<>
                <h1>Waiting for Match...</h1>
                <Button onClick={() => leaveQueue()}>Return</Button>
            </>);
        }
    }

    return (
    <div>
        <p>{"Username: " + username}</p>
        <p>{"Players online: " + playersOnline}</p>
        <p>{"Room: " + room}</p>
        <p>It's <time dateTime={response}>{response}</time></p>
        { loadView(onlineStatus) }
    </div>
    )
}

export default OnlineLobby;
