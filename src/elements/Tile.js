import {useState} from "react";
import {CSSTransition} from 'react-transition-group';
import "./Tile.css"

function Example() {
    const [isEnter, setIsEnter] = useState(false);
    return (
        <div class="container">
            <button onClick={() => {
                setIsEnter((v) => !v);
            }}>Transition</button>
            <CSSTransition
                in={isEnter}
                timeout={5000}
                className="myclass"
            >
                <p class="my-paragraph">Animate Me!</p>
            </CSSTransition>
        </div>
    )
}
export default Example