const words = ["AMSTERDAM", "JAVASCRIPT", "SOCKET", "HANGMAN"]; // Word list

module.exports = (io, socket, rooms) => {
    socket.on("startGame", ({ roomId }) => {
        if (!rooms[roomId]) return;

        // Pick a random word
        const word = words[Math.floor(Math.random() * words.length)];
        rooms[roomId].word = word;
        rooms[roomId].maskedWord = "_".repeat(word.length).split("");
        rooms[roomId].wrongGuesses = [];
        rooms[roomId].turnIndex = 0; // Start with first player
        rooms[roomId].whoseTurn = rooms[roomId].players[rooms[roomId].turnIndex]; // Start with first player

        io.to(roomId).emit("gameStarted", {
            maskedWord: rooms[roomId].maskedWord,
            turnIndex: rooms[roomId].turnIndex,
            whoseTurn: rooms[roomId].whoseTurn,
            players: rooms[roomId].players,
            room: rooms[roomId]
        });
    });

    socket.on("guessLetter", ({ roomId, letter }) => {
        if (!rooms[roomId]) return;

        const game = rooms[roomId];

        // Check if the letter is in the word
        if (game.word.includes(letter)) {
            game.word.split("").forEach((char, index) => {
                if (char === letter) game.maskedWord[index] = letter;
            });
        } else {
            game.wrongGuesses.push(letter);
        }
        // check if the game is won
        if (!game.maskedWord.includes("_")) {
            io.to(roomId).emit("gameOver", { status: "Win", word: game.maskedWord, wrongGuesses: game.wrongGuesses });
            return
        }
        // check if game is lost
        if (game.wrongGuesses.length === 10) {
            io.to(roomId).emit("gameOver", { status: "Lose", word: game.maskedWord, wrongGuesses: game.wrongGuesses })
            return

        }

        // Move to next player
        game.turnIndex = (game.turnIndex + 1) % game.players.length;
        game.whoseTurn = game.players[game.turnIndex]

        io.to(roomId).emit("gameUpdate", {
            maskedWord: game.maskedWord,
            wrongGuesses: game.wrongGuesses,
            turnIndex: game.turnIndex,
            whoseTurn: game.whoseTurn
        });
    });
    socket.on("restart", ({ roomId }) => {
        console.log("restarted top - ", roomId)
        if (!rooms[roomId]) return;

        const game = rooms[roomId];
        //reset
        game.word = words[Math.floor(Math.random() * words.length)]
        game.maskedWord = "_".repeat(game.word.length).split("")
        game.wrongGuesses = []
        game.turnIndex = 0
        game.whoseTurn = game.players[game.turnIndex]
        console.log("restarted - ", roomId)
        io.to(roomId).emit("gameUpdate", {
            maskedWord: game.maskedWord,
            wrongGuesses: game.wrongGuesses,
            turnIndex: game.turnIndex,
            whoseTurn: game.whoseTurn
        });
        return;
    });


};
