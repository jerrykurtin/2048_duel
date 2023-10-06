import React, {useState} from 'react'
import "./Tile.css"

function Tile({row, col, color, val, isNew, isDeleted}) {

    // window.innerWidth is accurate for desktop, and window.screen.availWidth is accurate for mobile
    // both are wrong for the other, but they're always larger than they should be, so min should be sufficient
    var actualWidth = Math.min(window.innerWidth, window.screen.availWidth);
    const [tileDim, setTileDim] = useState(21.78); // (actualWidth < 520) ? 21.78 : 121);
    // const [measurement, setMeasurement] = useState((actualWidth < 520) ? "vw" : "px");

    React.useEffect(() => {
        // resize tiles to fit the screen
        function handleResize() {
            actualWidth = Math.min(window.innerWidth, window.screen.availWidth);
            // setTileDim((actualWidth < 520) ? 21.78 : 121);
            // setMeasurement((actualWidth < 520) ? "vw" : "px");
        }
        window.addEventListener("resize", handleResize);
    })

    let transformation = "translate( calc(" + col * tileDim + " * var(--vw)), calc(" + row * tileDim + " * var(--vw)))";
    let style = {
        Transform: transformation,
        WebkitTransform: transformation,
        MozTransform: transformation,
    };

    return (
        <div className={"tile" + ((isNew) ? " tile-new" : "") + (isDeleted ? " deleted" : "")} style={style}>
                {/* Shadow must go on tile-inner */}
                <div className={"tile-inner color " + color + " tile-" + val}>
                    <div className="tile-layer white"/>
                    {/* Background must go on a tile-layer so opacity can change */}
                    <div className={"tile-layer background " + color + " tile-" + val}></div>
                    <div className="tile-layer" ><div className="tile-text">{val}</div></div>
                </div>
        </div>
    )
}

export default Tile
