import React from 'react'

import "./HowToPlay.css"
import movement from '../assets/tutorial-movement.png';
import collide from '../assets/tutorial-collide.png';
import steal from '../assets/tutorial-steal.png';
import win from '../assets/tutorial-win.png';


function HowToPlay({winningPiece, ...props}) {
    return (
        <div {...props}>
            <div className="tutorial-text">Swipe or use arrow keys to move all squares in a direction.</div>
            <img className="tutorial-img" src={movement} alt="movement illustration"/>
            <div className="tutorial-text">Collide two squares of the same number to combine them and double the number.</div>
            <img className="tutorial-img" src={collide} alt="collide illustration"/>
            <div className="tutorial-text">Your squares are color-coded. On your turn, collide one of your squares with one of your opponent's to steal it.</div>
            <img className="tutorial-img" src={steal} alt="steal illustration"/>
            <div className="tutorial-text">The first to create the {winningPiece} square in their color wins!</div>
            <img className="tutorial-img" src={win} alt="win illustration"/>
        </div>
    )
}

export default HowToPlay
