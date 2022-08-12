import React from "react"
import RollsInfos from "./components/RollsInfos"
import Timer from "./components/Timer"
import DiceContainer from "./components/DiceContainer"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

    const [dices, setDices] = React.useState(generateAllDices())
    const [rolls, setRolls] = React.useState(0)
    const [tenzies, setTenzies] = React.useState(false)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [time, setTime] = React.useState(0)

    React.useEffect(() => {
        console.log("pwett")
        let timer = 0
        if (isPlaying) {
            timer = setTimeout(() => setTime(prevtime => prevtime + 1), 100)
        }

        return () => clearTimeout(timer)

    }, [isPlaying, time])

    React.useEffect(() => {
        let win = true
        const referenceDice = dices[0]
        for (const dice of dices) {
            if (referenceDice.value !== dice.value || !dice.isHold) {
                win = false
            }
        }
        if (win) {
            console.log("win !!!")
            setTenzies(win)
        }
    }, [dices])

    React.useEffect(() => {
        if (tenzies) {
            setIsPlaying(false)
            if (!localStorage.getItem("bestRolls") || localStorage.getItem("bestRolls") > rolls) {
                localStorage.setItem("bestRolls", rolls)
            }
            if (!localStorage.getItem("bestTime") || localStorage.getItem("bestTime") > time) {
                localStorage.setItem("bestTime", time)
            }
        }
    }, [tenzies, rolls, time])

    function rollDice() {
        return Math.ceil(Math.random() * 6)
    }

    function generateAllDices() {

        let dicesArray = []
        for (let i = 1; i <= 10; i++) {
            dicesArray.push({
                value: rollDice(),
                isHold: false,
                id: nanoid()
            })
        }
        return dicesArray
    }

    function holdDice(id) {
        if (isPlaying) {
            setDices(prevdices => {
                let newdices = []
                let currentdice = {}
                for (let i = 0; i < prevdices.length; i++) {
                    if (prevdices[i].id === id) {
                        currentdice = {
                            ...prevdices[i],
                            isHold: !prevdices[i].isHold
                        }
                    } else {
                        currentdice = {
                            ...prevdices[i]
                        }
                    }
                    newdices.push(currentdice)
                }
                return newdices
            })
        }
    }

    function rollDices() {
        setDices(prevdices => {
            let newdices = []
            let currentdice = {}
            for (let i = 0; i < prevdices.length; i++) {
                if (prevdices[i].isHold === true) {
                    currentdice = {
                        ...prevdices[i]
                    }
                } else {
                    currentdice = {
                        ...prevdices[i],
                        value: rollDice()
                    }
                }
                newdices.push(currentdice)
            }
            return newdices
        })
        setRolls(nbrolls => nbrolls + 1)
    }

    function newGame() {
        setTenzies(false)
        setIsPlaying(true)
        setDices(generateAllDices())
        setRolls(0)
        setTime(0)
    }


    return (
        <main>
            {tenzies && <Confetti />}
            <div className="gameContainer">
                <h1>Tenzies</h1>
                <h2>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</h2>
                <RollsInfos rolls={rolls} />
                <Timer time={time} />
                <DiceContainer dices={dices} holdDice={holdDice} />
                <button onClick={isPlaying ? rollDices : newGame}>{isPlaying ? "Roll" : "New Game"}</button>
            </div>
        </main>)
}

