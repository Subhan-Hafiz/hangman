import { useEffect, useState } from "react"
import socket from "../Lobby/SocketInstance"
import axios from "axios"

const PlayerTurnTracker = ({ room, turnIndex, setTurnIndex }) => {
    const [players, setPlayers] = useState(room.players)
    useEffect(() => {
        getRoomData()
    }, [])

    const getRoomData = async () => {
        const response = await axios.get(`http://localhost:4000/rooms/${room.roomId}`);
        setPlayers(response.data.players)
        setTurnIndex(response.data.turnIndex)
    }

    useEffect(() => { }, [turnIndex])
    return (
        <div data-stack="align-center" style={{ marginTop: "1rem" }}>
            <h3 style={{ color: "green", textDecoration: "underline" }}>Players</h3>
            <ul>
                {players.map((player, index) => (
                    <li key={player.id}>
                        {player.name} {index === turnIndex ? "⭐ (Your Turn)" : ""}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PlayerTurnTracker