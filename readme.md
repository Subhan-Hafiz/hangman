# Multiplayer Hangman Game
This is a co-op, turn-based, real-time multiplayer Hangman game built using React for the frontend and Node.js with Socket.io for the backend.
![image](https://github.com/user-attachments/assets/50bd89f2-ccaf-4c79-a6e7-c99561467fe0)

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
3. Create a player
   ![image](https://github.com/user-attachments/assets/6a05035d-ed6d-4fe1-bc72-741cbdadb8cb)
5. Create a room and share the room ID with other players.
   ![image](https://github.com/user-attachments/assets/fca3c978-9e31-471e-8c5b-88e678f8718a)

6. Players join the room and the host starts the game.
 ![image](https://github.com/user-attachments/assets/23834cd6-0378-4482-b308-46d656d1f8c9)
![image](https://github.com/user-attachments/assets/bab551a3-7f3b-41bf-a634-a6ce880110af)

8. Players take turns guessing letters until the word is solved or max wrong guesses are reached.
 ![image](https://github.com/user-attachments/assets/8be86886-56cd-443c-9584-aec36502269f)



## Technologies Used
- **Frontend:** React, Socket.io-client
- **Backend:** Node.js, Express, Socket.io

## Contributing
Feel free to submit pull requests or report issues!

## License
This project is open-source under the MIT License.

