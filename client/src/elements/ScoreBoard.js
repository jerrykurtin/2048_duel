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
        ? <>Time -<pre>{" "}</pre>{timer}</>
        :<>{timer}<pre>{" "}</pre>- Time</>)
    }

    return (
        <div className={"custom-card board-info board-info-" + direction + " text-" + direction}>
            <div className={"text header" + " " + color}><strong>{name}</strong></div>
            {((timer) ? 
                <div className="text">
                    <div className={"timer-container-" + direction}>
                        {loadTimer()}
                    
                    </div>
                </div>
                : <></>
            )}
            <div className="text" >{((isLeft)
            ? <>Score - {score}</>
            : <>{score} - Score</>)}
            </div>
        </div>
    )
}

export default ScoreBoard
