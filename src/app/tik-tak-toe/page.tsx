"use client"

import React, { useState } from "react"
import PlayerSetupPage from "@/app/tik-tak-toe/components/PlayerSetup"
import { useAppSelector } from "@/store"
import GameBoard from "@/app/tik-tak-toe/components/GameBoard"
import ScoreCard from "@/app/tik-tak-toe/components/ScoreCard"

const TikTakToe = () => {
  const { players } = useAppSelector((state) => state.game)
  const arePlayersSet = Boolean(players[0].name && players[1].name)
  const [startGame, setStartGame] = useState(arePlayersSet)

  if (startGame)
    return (
      <div className='s mx-auto mt-10 grid w-max grid-cols-2 gap-8'>
        <GameBoard />
        <ScoreCard />
      </div>
    )
  else return <PlayerSetupPage onSetup={() => setStartGame(true)} />
}

export default TikTakToe
