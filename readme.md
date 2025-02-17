# Multiplayer Hangman Game
This is a co-op, turn-based, real-time multiplayer Hangman game built using React for the frontend and Node.js with Socket.io for the backend.

## Features
- Multiplayer support with real-time updates
- Host can create a room and invite players
- Players can search for rooms and join any game
- Players take turns guessing letters
- Game state syncs across all players
- Win/loss detection and restart

## Installation and Setup
### **Frontend**
1. Navigate to the frontend directory:
   ```sh
   cd hangman_frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### **Backend**
1. Navigate to the backend directory:
   ```sh
   cd hangman_backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm run start
   ```

## Usage
1. Start the backend server first.
2. Start the frontend and open it in a browser.
3. Create a room and share the room ID with other players.
4. Players join the room and the host starts the game.
5. Players take turns guessing letters until the word is solved or max wrong guesses are reached.

## Technologies Used
- **Frontend:** React, Socket.io-client
- **Backend:** Node.js, Express, Socket.io

## Contributing
Feel free to submit pull requests or report issues!

## License
This project is open-source under the MIT License.

