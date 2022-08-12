import React from "react"

export default function RollsInfos(props) {
    return (
        <div className="infos">
            <div>Numbers of rolls : {props.rolls}</div>
            {localStorage.getItem("bestRolls") && <div className="score">Best rolls : {localStorage.getItem("bestRolls")}</div>}
        </div>
    )
}