import React from "react"
import './Dice.css'


function Pip() {
    return (
        <span className="pip" />
    )
}

export default function Dice(props) {
    let pips = Number.isInteger(props.value)
        ? Array(props.value)
            .fill(0)
            .map((_, i) => <Pip key={i} />)
        : null;
    return (
        <div
            className={`face ${props.isHold ? 'hold' : 'free'}`}
            key={props.id}
            onClick={() => props.holdDice(props.id)}
        >
            {pips}
        </div>
    )
}


