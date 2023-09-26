import React from 'react'

function HowToPlay({winningPiece, ...props}) {
  return (
    <div {...props}>
      <h5>Controls</h5>
        <ul>
          <li>Swipe or use arrow keys to move all squares in a direction.</li>
          <li>Collide two squares of the same number to combine them and double the number</li>
        </ul>
        <h5>Duel</h5>
        <ul>
          <li>Your pieces are color-coded</li>
          <li>On your turn, collide one of your squares with your oponnent's to steal it</li>
          <li>The first to create the {winningPiece} square wins!</li>
        </ul>
    </div>
  )
}

export default HowToPlay
