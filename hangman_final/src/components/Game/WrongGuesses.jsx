import React, { useEffect, useState } from 'react'
import HangManFigure from './HangManFigure'
import socket from '../Lobby/SocketInstance'

const WrongGuesses = ({ wrongGuesses }) => {
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
