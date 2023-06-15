import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.1.231:4000";

function OnlineLobby() {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            console.log("response received!");
            setResponse(data);
        });
    }, []);

    return (
    <div>
        <h1>Waiting for Match...</h1>
        <p>people in lobby: 1</p>
        <p>It's <time dateTime={response}>{response}</time></p>
    </div>
    )
}

export default OnlineLobby
