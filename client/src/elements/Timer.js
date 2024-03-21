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
        console.log("[DEBUG] time: ", time, "prev time: ", prevTime);

        if (time > prevTime) {
            console.log("[DEBUG] reset detected, signaling finished = false");
            signalFinish(false);
            setPrevTime(time);
            return;
        }

        setPrevTime(time);
        if (time === 0){
            signalFinish(true);
            setIsPaused(true);
            console.log("[DEBUG] timeout, signaling finish");
            return;
        }

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
    }, [time]);

    // pause / continue
    useEffect(() => {
        // continue timer
        if (startStopTimer){
            setIsPaused(false);
        }

        // pause timer
        else {
            setIsPaused(true);
        }
    }, [startStopTimer]);

    // reset timer
    useEffect(() => {
        if (resetTimer){
            setResetTimer(false);
            setTime(startValue * 1000);
            console.log("[DEBUG] resetting timer to ", startValue * 1000);
        }
    }, [resetTimer]);

  return (
    <div>
        {round(time / 1000)}
    </div>
  )
}

export default Timer
