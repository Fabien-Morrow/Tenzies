import React from "react"
import Dice from "./Dice"

export default function DiceContainer(props) {

    const diceElements = props.dices.map(dice => {
        return (
            <Dice
                value={dice.value}
                isHold={dice.isHold}
                key={dice.id}
                id={dice.id}
                holdDice={props.holdDice}
            />
        )
    })
    return (
        <div className="diceContainer">
            {diceElements}
        </div>
    )
}