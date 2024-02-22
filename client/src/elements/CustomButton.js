import React, {useEffect, useRef} from 'react'
import './CustomButton.css'

function CustomButton() {
    const topRef = useRef();
    const bottomRef = useRef();

    useEffect(() => {
        if (topRef.current && bottomRef.current) {
        const { width, height } = window.getComputedStyle(topRef.current);
        bottomRef.current.style.width = width;
        bottomRef.current.style.height = height;
        }
    }, []);

    return (
        <div className="custom-button-wrapper">
            <div className="custom-button-bottom" ref={bottomRef}/>
            <div className="custom-button-top" ref={topRef}>
                <h3>Title Hello There</h3>
                <div>Contents</div>
            </div>
            
        </div>
    )
}

export default CustomButton
