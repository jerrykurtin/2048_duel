import {useState, useEffect} from "react";
import {CSSTransition} from 'react-transition-group';
import useMountTransition from "./useMountTransition";
import "./Example.css"

function Example() {
    const [isMounted, setIsMounted] = useState(true);
    const hasTransitionedIn = useMountTransition(isMounted, 1000);
    var element = <div
        className={`card ${hasTransitionedIn && 'in'} ${isMounted && 'visible'}`}
        >
            Card Content
    </div>;
    return (

        <div className="container">
      <button onClick={() => setIsMounted(!isMounted)}>
        {`${isMounted ? 'Hide' : 'Show'} Element`}
      </button>
        {element}
      {/* <div className="content">
        {(hasTransitionedIn || isMounted) && (
          <div
            className={`card ${hasTransitionedIn && 'in'} ${isMounted && 'visible'}`}
          >
            Card Content
          </div>
    )}
      </div> */}
    </div>
    )
}
export default Example