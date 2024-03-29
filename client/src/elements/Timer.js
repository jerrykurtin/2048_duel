import React, {useEffect, useState} from 'react'

function round(number, digits=1){
    return (Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits);
}

function Timer({signalFinish, startValue, startStopTimer, resetTimer, setResetTimer}) {
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0.0);
    const [prevTime, setPrevTime] = useState(0.0);

    // actually count down the timer
    useEffect(() => {
        console.log(" time: ", time, "prev time: ", prevTime);

        if (time > prevTime) {
            signalFinish(false);
        }
        // Only test for 0 if not reset
        else if (time === 0){
            signalFinish(true);
            setIsPaused(true);
            console.log("[timer] timeout, signaling finish");
            return;
        }

        setPrevTime(time);

        let interval = null;
        if (!isPaused) {
            interval = setInterval(() => {
                setTime((time) => time - 100);
            }, 100);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [time, isPaused]);

    // pause / continue
    useEffect(() => {
        // continue timer
        if (startStopTimer){
            console.log("[timer] continuing timer")
            setIsPaused(false);
        }

        // pause timer
        else {
            console.log("[timer] pausing timer")
            setIsPaused(true);
        }
    }, [startStopTimer]);

    // reset timer
    useEffect(() => {
        if (resetTimer){
            setResetTimer(false);
            setTime(startValue * 1000);
            console.log("[timer] resetting timer to ", startValue * 1000);
        }
    }, [resetTimer]);

  return (
    <div>
        {round(time / 1000)}
    </div>
  )
}

export default Timer
