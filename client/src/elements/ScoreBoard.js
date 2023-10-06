import React, {useState, useEffect} from 'react';

import Timer from './Timer';

function ScoreBoard({isLeft, color, name, score, timer, signalFinish, timeLimit, startStopTimer, resetTimer, setResetTimer}) {
    
    var direction = "right";
    if (isLeft) {
        direction = "left";
    }

    function loadTimer() {
        let timer = <Timer signalFinish={signalFinish} startValue={timeLimit} startStopTimer={startStopTimer} resetTimer={resetTimer} setResetTimer={setResetTimer}/>;
        return ((isLeft)
        ? <>Time -<pre>{" "}</pre><strong>{timer}</strong></>
        :<><strong>{timer}</strong><pre>{" "}</pre>- Time</>)
    }

    return (
        <div className={"custom-card small-border board_info-" + direction + " text text-" + direction + " " + color}>
            <div className="board_info-internal text header"><strong>{name}</strong></div>
            {((timer) ? 
                <div className="board_info-internal text">
                    <div className={"timer-container-" + direction}>
                        {loadTimer()}
                    
                    </div>
                </div>
                : <></>
            )}
            <div className="board_info-internal text" >{((isLeft)
            ? <>Score - <strong>{score}</strong></>
            : <><strong>{score}</strong> - Score</>)}
            </div>
        </div>
    )
}

export default ScoreBoard
