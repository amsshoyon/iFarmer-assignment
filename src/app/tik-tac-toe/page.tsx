"use client"

import React from "react"
import PlayerSetupPage from "@/app/tik-tac-toe/components/PlayerSetup"
import { useAppSelector } from "@/store"
import GameBoard from "@/app/tik-tac-toe/components/GameBoard"
import ScoreCard from "@/app/tik-tac-toe/components/ScoreCard"
import ResultModal from "@/app/tik-tac-toe/components/ResultModal"

const TikTakToe = () => {
  const { players } = useAppSelector((state) => state.game)
  const startGame = Boolean(players[0].name && players[1].name)

  if (startGame)
    return (
      <div className='s mx-auto mt-10 grid w-max grid-cols-1 gap-8 sm:grid-cols-2'>
        <GameBoard />
        <ScoreCard />
        <ResultModal />
      </div>
    )
  else return <PlayerSetupPage />
}

export default TikTakToe
