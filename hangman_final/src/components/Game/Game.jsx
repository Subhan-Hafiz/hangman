import { useEffect, useState } from "react"
import Guesses from "./Guesses"
import WrongGuesses from "./wrongGuesses"
import PlayerTurnTracker from "./PlayerTurnTracker"
import socket from "../Lobby/SocketInstance"

const Game = ({ room }) => {
    const [wrongGuesses, setWrongGuesses] = useState([])
    const [status, setStatus] = useState(false)
    const [maskWord, setMaskWord] = useState('');
    const [whoseTurn, setWhoseTurn] = useState('');
    const [answer, setAnswer] = useState("")
    const [turnIndex, setTurnIndex] = useState(0)

    useEffect(() => {
        socket.on("gameStarted", ({ maskedWord, whoseTurn }) => {
            setMaskWord(maskedWord)
            setWhoseTurn(whoseTurn)
            setAnswer("")
        })
        socket.on("gameUpdate", ({
            wrongGuesses,
            maskedWord,
            turnIndex,
            whoseTurn
        }) => {
            setWrongGuesses(wrongGuesses)
            setStatus(false)
            setMaskWord(maskedWord)
            setWhoseTurn(whoseTurn)
            setTurnIndex(turnIndex)
        })
        socket.on("gameOver", ({ wrongGuesses, status, word, answer }) => {
            setWrongGuesses(wrongGuesses)
            setStatus(status)
            setMaskWord(word)
            setAnswer(answer)
        })
        return () => {
            socket.off("gameUpdate")
            socket.off("gameOver")
            socket.off("gameStarted")
        }
    }, [])
    return (
        <>
            <Guesses
                room={room}
                status={status}
                maskWord={maskWord}
                whoseTurn={whoseTurn}
                wrongGuesses={wrongGuesses}
                answer={answer}
                setStatus={setStatus}
                setMaskWord={setMaskWord}
                setAnswer={setAnswer}
            />
            <WrongGuesses wrongGuesses={wrongGuesses} />
            <PlayerTurnTracker room={room} turnIndex={turnIndex} setTurnIndex={setTurnIndex} />
        </>
    )
}

export default Game