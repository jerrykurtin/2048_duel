import React, {useState, useEffect, useRef} from 'react'
import './PopBox.css'

function PopBox({color, onClick, className, children, darkBackground = false, disabled = false, large = false}) {
    const clickDurationMs = ((large) ? 110 : 85);
    const topRef = useRef();
    const bottomRef = useRef();
    const wrapperRef = useRef();
    const [clicked, setClicked] = useState(false);

  function setClickedWithTimeout() {
    setClicked(true);
    setTimeout( () => {
      setClicked(false);
      if (onClick) {
        onClick();
      }
    }, clickDurationMs);
  }

    // Update the sizes of the div
    useEffect(() => {
        const updateSize = () => {
            if (topRef.current && bottomRef.current && wrapperRef.current) {
                const { width, height } = window.getComputedStyle(topRef.current);
                const { left, top } = window.getComputedStyle(bottomRef.current);

                const wrapperWidth = parseFloat(width) + parseFloat(left);
                const wrapperHeight = parseFloat(height) + parseFloat(top);
                wrapperRef.current.style.width = wrapperWidth + 'px';
                wrapperRef.current.style.height = wrapperHeight + 'px';

                bottomRef.current.style.width = width;
                bottomRef.current.style.height = height;
            }
        }

        // Run the function once to set the initial size
        updateSize();

        // Add the event listener for window resize
        window.addEventListener('resize', updateSize);

        // Cleanup function to remove the event listener
        return () => window.removeEventListener('resize', updateSize);
    }, [children]);

    return (
        <div className={"pop-box " + ((className) ? className + " " : "") + color + ((large) ? " pop-box-large" : "") + ((clicked && !disabled) ? " selected" : "")} onClick={()=>setClickedWithTimeout()} ref={wrapperRef}>
            <div className="pop-box-bottom" ref={bottomRef}/>
            <div className={"pop-box-top" + ((darkBackground) ? " dark-background" : "")} ref={topRef}>
                {children}
            </div>
        </div>
    )
}

export default PopBox
