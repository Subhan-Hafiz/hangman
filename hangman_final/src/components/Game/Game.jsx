import { useEffect, useState } from "react"
import Guesses from "./Guesses"
import WrongGuesses from "./wrongGuesses"
import PlayerTurnTracker from "./PlayerTurnTracker"

const Game = ({ room }) => {
    return (
        <>
            <Guesses room={room} />
            <WrongGuesses />
            <PlayerTurnTracker room={room} />
        </>
    )
}

export default Game