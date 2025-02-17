import React, { useEffect, useState } from 'react'
import HangManFigure from './HangManFigure'
import socket from '../SocketInstance'

const WrongGuesses = () => {
  const [wrongGuesses, setWrongGuesses] = useState([])
  useEffect(() => {
    socket.on("gameUpdate", ({
      maskedWord,
      wrongGuesses,
      turnIndex
    }) => {
      console.log("WrongGuesses", wrongGuesses)
      setWrongGuesses(wrongGuesses)
    })
    socket.on("gameOver", ({ wrongGuesses }) => {
      console.log("🚀 ~ gameOver ~ WrongGuesses:", wrongGuesses)
      setWrongGuesses(wrongGuesses)
    })
    return () => {
      socket.off("gameUpdate")
      socket.off("gameOver")
    }
  }, [])
  return (
    <div data-stack="align-center" style={{ "--gutter": "0.5rem", marginTop: "2rem" }}>
      <div>
        <span style={{ color: "red", textDecoration: "underline" }}>{wrongGuesses.length > 0 &&
          "Wrong Letters:"
        }</span>{"  "}
        {wrongGuesses.join(', ')}
      </div>

      <HangManFigure fails={wrongGuesses.length} />

    </div>
  )
}

export default WrongGuesses
