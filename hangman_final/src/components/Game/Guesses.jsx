import { useEffect, useState } from "react";
import { alphabets } from "../constants/constants";
import socket from "../SocketInstance";
import axios from "axios";

const Guesses = ({ room }) => {
    // const [word, setWord] = useState('AMSTERDAM')
    const [status, setStatus] = useState(false)
    const [maskWord, setMaskWord] = useState('');
    const [whoseTurn, setWhoseTurn] = useState('');
    const [wrongGuesses, setWrongGuesses] = useState([])
    const isHost = socket.id === room.host
    useEffect(() => {
        socket.on("gameStarted", ({ maskedWord, whoseTurn }) => {
            setMaskWord(maskedWord)
            setWhoseTurn(whoseTurn)
        })
        socket.on("gameOver", ({ status, word }) => {
            setStatus(status)
            setMaskWord(word)
            // if (isHost && confirm(`You ${status}. Restart?`)) {
            //     restart()
            // }
        })
        socket.on("gameUpdate", ({
            maskedWord,
            wrongGuesses,
            turnIndex,
            whoseTurn
        }) => {
            setStatus(false)
            setMaskWord(maskedWord)
            setWhoseTurn(whoseTurn)
            setWrongGuesses(wrongGuesses)
        })
        getRoomData()
        return () => {
            socket.off("gameStarted")
            socket.off("gameOver")
            socket.off("gameUpdate")
        }
    }, [])
    const getRoomData = async () => {
        const response = await axios.get(`http://localhost:4000/rooms/${room.roomId}`);
        setMaskWord(response.data.maskedWord)
    }

    const onGuess = (letter) => {
        socket.emit("guessLetter", { roomId: room.roomId, letter })
    }

    const restart = () => {
        socket.emit("restart", { roomId: room.roomId })
        setStatus(false)
    }

    return (
        <div data-stack="align-center">
            <div data-cluster="justify-center" style={{ "--gutter": "0.5rem", fontSize: "1.5rem" }}>
                {maskWord && maskWord.map(char => <span>{char}</span>)}
            </div>
            <div data-cluster="align-center" style={{ "--gutter": "1rem" }}>
                {status && `You ${status}`}
                {status && isHost && <button style={{ backgroundColor: "#b1eead" }} onClick={restart}>Restart</button>}
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