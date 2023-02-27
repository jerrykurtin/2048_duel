import {useState, useEffect} from "react";



const useMountTransition = (isMounted, unmountDelay) => {
    const [hasTransitionedIn, setHasTransitionedIn] = useState(false);
  
    useEffect(() => {
      let timeoutId;
  
      if (isMounted && !hasTransitionedIn) {
        console.log("transition in started!");
        timeoutId = setTimeout(() => setHasTransitionedIn(true), unmountDelay);
      } else if (!isMounted && hasTransitionedIn) {
        console.log("transitioning out");
        setHasTransitionedIn(false);
      }
  
      return () => {
        clearTimeout(timeoutId);
      }
    }, [unmountDelay, isMounted, hasTransitionedIn]);
  
    return hasTransitionedIn;
}

export default useMountTransition