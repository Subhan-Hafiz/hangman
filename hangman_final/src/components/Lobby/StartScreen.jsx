import axios from "axios";
import { useEffect, useState } from "react";
import socket from "./SocketInstance";
// Backend URL

const StartScreen = ({ setRoom }) => {
    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [rooms, setRooms] = useState([]);
    const [showCreateRoomScreen, setShowCreateRoomScreen] = useState(false);
    const [showJoinRoomScreen, setShowJoinRoomScreen] = useState(false);
    const [password, setPassword] = useState("");

    useEffect(() => {
        socket.on("roomUpdate", (data) => {
            setRoom(data);
        });

        return () => {
            socket.off("roomUpdate");
        };
    }, []);

    const createRoom = () => {
        socket.emit("createRoom", { roomId, password, name });
        socket.once("roomUpdate", (data) => {
            setRoom(data);
        });
    };

    const joinRoom = (room) => {
        if (room.hasPassword) {
            setSelectedRoom(room.roomId); // Ask for password
        } else {
            socket.emit("joinRoom", { roomId: room.roomId, name });
            socket.once("roomUpdate", (data) => {
                setRoom(data);
            });
        }
    };

    const showRooms = async () => {
        setShowJoinRoomScreen(!showJoinRoomScreen)
        const response = await axios.get("http://localhost:4000/rooms");
        setRooms(response.data);
    };

    return (
        <>
            <h1>Hang Man</h1>
            {!showCreateRoomScreen && !showJoinRoomScreen && (
                <div data-cluster="align-center" style={{ "--gutter": "1rem" }}>
                    <div data-stack>
                        <label htmlFor="name" style={{ "fontSize": "0.875rem" }}>Set Player Name</label>
                        <input type="text" id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <button onClick={() => setShowCreateRoomScreen(!showCreateRoomScreen)} disabled={!name}>New Room</button>
                    <button onClick={showRooms} disabled={!name}>Join A Room</button>
                </div>
            )}  {showCreateRoomScreen && (
                <div data-cluster="align-center" style={{ "--gutter": "1rem" }}>
                    <div data-stack style={{ "--gutter": "0.5rem" }}>
                        <input type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                        {/* <input type="password" placeholder="Password (optional)" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
                    </div>
                    <button onClick={createRoom}>Create Room</button>
                    <button onClick={() => setShowCreateRoomScreen(!showCreateRoomScreen)}>Back</button>
                </div>
            )}
            {showJoinRoomScreen && (
                <>
                    <h2>Available Rooms</h2>
                    <ul>
                        {rooms.length > 0 && rooms.map((room) => (
                            <li key={room.roomId} onClick={() => joinRoom(room)} style={{ cursor: "pointer" }}>
                                {room.roomId} {room.hasPassword ? "🔑" : ""} ({room.playerCount} players)
                            </li>
                        ))}
                        {!rooms.length && <p>No rooms created yet!</p>}
                    </ul>
                    <button onClick={() => setShowJoinRoomScreen(!showJoinRoomScreen)}>Back</button>

                </>
            )}
        </>
    )
}

export default StartScreen