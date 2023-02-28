import {useState, useEffect} from "react";


const useDelayedSignal = (reset, setReset, delay) => {
    /* useDelayedSignal is a hook that will send its signal delay ms after the reset is set to true
    arguments:
    reset: react state, initially set to false, set to true to send signal, reset will set to false once finished
    setReset: the setter for the reset state
    
    an example usecase is shown below:

    const [reset, setReset] = useState(false);
    const delayedSignal = useDelayedSignal(reset, setReset, 25);

    useEffect( () => {
        setReset(true);
        console.log("move triggered!");
    }, [turn]);
    
    */
    const [hasFinishedDelay, sethasFinishedDelay] = useState(false);
  
    useEffect(() => {
      let timeoutId;
      
      if (reset) {
        sethasFinishedDelay(false);
        setReset(false);
        console.log("transition reset!");
      }
      // else will causen infinite loop
      else if (true){
        console.log("starting transition...");
        timeoutId = setTimeout(() => {
            console.log("Transition finished! setting transitionedIn to true");
            sethasFinishedDelay(true);
        }, delay);
      } 
  
      return () => {
        clearTimeout(timeoutId);
      }
    }, [delay, reset, setReset, hasFinishedDelay]);
  
    return hasFinishedDelay;
}

export default useDelayedSignal