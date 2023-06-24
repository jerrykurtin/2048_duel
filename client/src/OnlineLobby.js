import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.1.231:4000";

function OnlineLobby() {
    const [response, setResponse] = useState("");
    const [playersOnline, setPlayersOnline] = useState(0);
    const [onlineStatus, setOnlineStatus] = useState("lobby");  // "lobby", "waiting", "privateWaiting", "inGame"
    const [username, setUsername] = useState("");

    // start and end socket connnection
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        socket.on("TestTime", data => {
            console.log("response received!");
            setResponse(data);
        });

        socket.on("OnlineCount", (pOnline) => {
            console.log("new player");
            setPlayersOnline(pOnline);
        })

        socket.on("username", (newUsername) => {
            console.log("new username given: ", newUsername);
            setUsername(newUsername);
        })

        // clean up
        return () => socket.disconnect();
    }, []);

    function loadView(status) {
        if (status === "lobby") {
            return (<>
                <h1>Lobby</h1>
                <Button onClick={() => setOnlineStatus("waiting")}>Join Random Match</Button>
                <Button>Start Local Match</Button>
                <Button>Join Local Match</Button>
            </>);
        }
        
        else if (status === "waiting") {
            return (<>
                <h1>Waiting for Match...</h1>
                <Button onClick={() => setOnlineStatus("lobby")}>Return</Button>
    
            </>);
        }
    }

    return (
    <div>
        <p>{"Username: " + username}</p>
        <p>{"Players online: " + playersOnline}</p>
        <p>It's <time dateTime={response}>{response}</time></p>
        { loadView(onlineStatus) }
    </div>
    )
}

export default OnlineLobby;
