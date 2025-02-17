const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const gameHandler = require("./game");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Replace with frontend URL
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());

let rooms = {}; // Store active rooms

io.on("connection", (socket) => {
    gameHandler(io, socket, rooms);

    // Create a Room
    socket.on("createRoom", ({ roomId, password, name }) => {
        if (rooms[roomId]) {
            socket.emit("roomError", "Room already exists");
            return;
        }

        rooms[roomId] = {
            host: socket.id,
            players: [{ id: socket.id, name }],
            password
        };
        socket.join(roomId);
        io.to(roomId).emit("roomUpdate", { ...rooms[roomId], roomId });// Send updated room data
        console.log(`Room ${roomId} created by ${name}`);
    });

    // Join a Room
    socket.on("joinRoom", ({ roomId, password, name }) => {
        if (!rooms[roomId]) {
            socket.emit("roomError", "Room does not exist");
            return;
        }

        if (rooms[roomId].password && rooms[roomId].password !== password) {
            socket.emit("roomError", "Incorrect password");
            return;
        }

        rooms[roomId].players.push({ id: socket.id, name });

        socket.join(roomId);
        // Send the room data including the host
        io.to(roomId).emit("roomUpdate", { ...rooms[roomId], roomId });
        console.log(`User ${socket.id} joined Room ${roomId}`);
    });

    // Handle disconnect
    socket.on("disconnect", () => {
        Object.keys(rooms).forEach((roomId) => {
            rooms[roomId].players = rooms[roomId].players.filter((player) => player.id !== socket.id);

            // If no players left, delete room
            if (rooms[roomId].players.length === 0) delete rooms[roomId];
            else io.to(roomId).emit("roomUpdate", { ...rooms[roomId], roomId }); // Update remaining players
        });

        console.log("User disconnected:", socket.id);
    });
});

// Send the list of active rooms to a client
app.get("/rooms", (req, res) => {
    const roomList = Object.keys(rooms).map((roomId) => ({
        roomId,
        hasPassword: !!rooms[roomId].password, // Indicate if the room is locked
        playerCount: rooms[roomId].players.length,
    }));
    res.json(roomList);
});
app.get("/rooms/:roomId", (req, res) => {
    const roomId = req.params.roomId
    res.json(rooms[roomId]);
});


server.listen(4000, () => {
    console.log("Server running on port 4000");
});
