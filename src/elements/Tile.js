import React from 'react'
import "./Tile.css"

function Tile({row, col, color, val, isNew, isDeleted}) {
    let multiplier = 121;
    let style = {
        transform: "translate(" + (col) * multiplier + "px" + ", " + (row) * multiplier + "px" + ")",
    };

    return (
        <div className={"tile" + ((isNew) ? " tile-new" : "") + (isDeleted ? " deleted" : "")} style={style}>
                <div className={"tile-inner background tile-" + val + " " + color}>{val}</div>
        </div>
    )
}

export default Tile
