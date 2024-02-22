import {React, useState, useEffect} from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import "./Animation-Slide.css"
import Button from 'react-bootstrap/esm/Button';

function TestTransition() {
    const [direction, setDirection] = useState("forward");
    const [state, setState] = useState(1);
    const [currState, setCurrState] = useState(1);
    const [prevState, setPrevState] = useState(1);

    const [page1Transition, setPage1Transition] = useState("enter-left");
    const [page2Transition, setPage2Transition] = useState("hidden");
    const [page3Transition, setPage3Transition] = useState("hidden");


    useEffect (() => {
        setPrevState(currState);
        setCurrState(state);

    }, [state]);

    useEffect (() => {
        const stateSetters = [null, setPage1Transition, setPage2Transition, setPage3Transition];
        if (prevState > currState) {
            stateSetters[prevState]("exit-right");
            stateSetters[currState]("enter-left");
        }
        else {
            stateSetters[prevState]("exit-left");
            stateSetters[currState]("enter-right");
        }

    }, [currState]);

    return (
        <div>
            <div className="slide-window-container">
                <div className={"slide-window " + page1Transition}>
                    <Button onClick={()=>setState(2)}>Advance</Button>
                </div>
                <div className={"slide-window " + page2Transition}>
                    <Button onClick={()=>setState(1)}>Return</Button>
                    <Button onClick={()=>setState(3)}>Advance</Button>
                </div>
                <div className={"slide-window " + page3Transition}>
                    <Button onClick={()=>setState(2)}>Return</Button>
                    <Button onClick={()=>setState(1)}>Go to beginning</Button>
                </div>
            </div>
        </div>
    )
}

export default TestTransition
