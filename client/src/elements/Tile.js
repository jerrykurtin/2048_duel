import React, {useState} from 'react'
import "./Tile.css"

function Tile({row, col, color, val, isNew, isDeleted}) {

    // window.innerWidth is accurate for desktop, and window.screen.availWidth is accurate for mobile
    // both are wrong for the other, but they're always larger than they should be, so min should be sufficient
    var actualWidth = Math.min(window.innerWidth, window.screen.availWidth);
    const [tileDim, setTileDim] = useState((actualWidth < 520) ? 21.78 : 121);
    const [measurement, setMeasurement] = useState((actualWidth < 520) ? "vw" : "px");

    React.useEffect(() => {
        // resize tiles to fit the screen
        function handleResize() {
            actualWidth = Math.min(window.innerWidth, window.screen.availWidth);
            setTileDim((actualWidth < 520) ? 21.78 : 121);
            setMeasurement((actualWidth < 520) ? "vw" : "px");
        }
        window.addEventListener("resize", handleResize);
    })

    let style = {
        transform: "translate(" + (col) * tileDim + measurement + ", " + (row) * tileDim + measurement + ")",
    };

    return (
        <div className={"tile" + ((isNew) ? " tile-new" : "") + (isDeleted ? " deleted" : "")} style={style}>
                <div className={"tile-inner background tile-" + val + " " + color}>{val}</div>
        </div>
    )
}

export default Tile
