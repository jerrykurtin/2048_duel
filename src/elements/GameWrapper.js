import React from 'react';
import "./GameWrapper.css";

import BoardInfo from "./BoardInfo.js";
import Board from "./Board.js";
import TurnInfo from "./TurnInfo.js";
import Settings from "./Settings";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function GameBoard({p1color, p2color, p1score, p2score, board, owner, boardState, actions, p1name, p2name, p1possessive, p2possessive, turn}) {

    return (
    <div>
        <Navbar variant="light">
            <Container>
                <Navbar.Brand>2048 Duel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    {/* <Nav className="me-auto"> */}
                        <Nav.Link onClick={() => console.log("go home")}>Home</Nav.Link>
                    {/* </Nav> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <BoardInfo p1color={p1color} p2color={p2color} p1score={p1score} p2score={p2score} p1name={p1name} p2name={p2name}/>
        <Board p1color={p1color} p2color={p2color} p1name={p1name} p2name={p2name} board={board} owner={owner} actions={actions} turn={turn} boardState={boardState}/>
        <TurnInfo p1color={p1color} p2color={p2color} p1name={p1name} p2name={p2name} p1possessive={p1possessive} p2possessive={p2possessive} turn={turn} boardState={boardState}/>
        <Settings/>
        
    </div>
    )
}

export default GameBoard
