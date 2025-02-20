import { useEffect, useState } from "react";
import { alphabets } from "../constants/constants";
import socket from "../Lobby/SocketInstance";
import axios from "axios";

const Guesses = ({
    room,
    status,
    maskWord,
    whoseTurn,
    wrongGuesses,
    answer,
    setStatus,
    setMaskWord,
    setAnswer,
}) => {
    const isHost = socket.id === room.host
    useEffect(() => {
        getRoomData()
    }, [])

    const getRoomData = async () => {
        const response = await axios.get(`http://localhost:4000/rooms/${room.roomId}`);
        setMaskWord(response?.data?.maskedWord)
    }

    const onGuess = (letter) => {
        socket.emit("guessLetter", { roomId: room.roomId, letter })
    }

    const restart = () => {
        socket.emit("restart", { roomId: room.roomId })
        setStatus(false)
        setAnswer("")
    }

    return (
        <div data-stack="align-center">
            <div data-cluster="justify-center" style={{ "--gutter": "0.5rem", fontSize: "1.5rem" }}>
                {maskWord && maskWord.map(char => <span>{char}</span>)}
            </div>
            <div data-cluster="align-center" style={{ "--gutter": "1rem" }}>
                {status && `You ${status}`}
                {status && isHost && <button style={{ backgroundColor: "#b1eead" }} onClick={restart}>Restart</button>}
                {status && answer && <div>Answer is: {answer}</div>}
            </div>
            <div data-cluster="justify-center" style={{ "--gutter": "0.5rem", width: "50%" }}>
                {alphabets.map((letter, index) => (
                    <button
                        disabled={
                            socket.id !== whoseTurn.id ||
                            wrongGuesses.includes(letter) ||
                            maskWord.includes(letter) ||
                            status
                        }
                        onClick={() => onGuess(letter)}
                        key={index}
                    >
                        {letter}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default Guesses