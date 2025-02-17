import { useEffect, useState } from "react"
import StartScreen from "../Lobby/StartScreen"
import Game from "./Game"
import Lobby from "../Lobby/Lobby"
import socket from "../Lobby/SocketInstance"

const Hangman = () => {
    const [room, setRoom] = useState('')
    const [startGame, setStartGame] = useState(false)
    useEffect(() => {
        socket.on("gameStarted", () => setStartGame(true));

        return () => socket.off("gameStarted");
    }, []);
    return (
        <>
            {!room && <StartScreen setRoom={setRoom} />}
            {room && !startGame && <Lobby roomData={room} setStartGame={setStartGame} />}
            {startGame && <Game room={room} />}
        </>

    )
}

export default Hangman