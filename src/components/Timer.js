import React from "react"

export default function Timer(props) {
    return (
        <div className="infos">
            <div>Timer : {props.time / 10}</div>
            {localStorage.getItem("bestTime") && <div className="score">Best time : {localStorage.getItem("bestTime") / 10}</div>}
        </div>
    )
}