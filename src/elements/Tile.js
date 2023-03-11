import React, {useState} from 'react'
import "./Tile.css"

function Tile({row, col, color, val, isNew, isDeleted}) {

    const [tileDim, setTileDim] = useState((window.innerWidth < 520) ? 21.78 : 121);
    const [measurement, setMeasurement] = useState((window.innerWidth < 520) ? "vw" : "px")

    React.useEffect(() => {
        // resize tiles to fit the screen
        function handleResize() {
            setTileDim((window.innerWidth < 520) ? 21.78 : 121);
            setMeasurement((window.innerWidth < 520) ? "vw" : "px");
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
