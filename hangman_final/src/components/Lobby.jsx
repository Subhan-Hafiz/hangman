import { useEffect, useState } from "react"
import socket from "./SocketInstance"

const Lobby = ({ roomData, setStartGame }) => {
    const [room, setRoom] = useState(roomData)

    useEffect(() => {
        const updateRoom = (updatedData) => {
            setRoom(updatedData);
        };

        socket.on("roomUpdate", updateRoom);

        return () => {
            socket.off("roomUpdate", updateRoom);
        };
    }, []);
    const isHost = room.host === socket.id;
    return (
        <div>
            {/* <h2>Room: {roomData.host === socket.id ? "(Host)" : ""} {roomId}</h2> */}
            <h2>Room: {room.roomId}</h2>
            <p>Players:</p>
            <ul>
                {room.players.map((player) => (
                    <li key={player.id}>{player.name} {player.id === room.host ? "(Host)" : ""}</li>
                ))}
            </ul>
            {isHost && <button onClick={() => { socket.emit("startGame", room); setStartGame(true) }}>Start Game</button>}
        </div>
    )
}

export default Lobby