"use client"

import React, { useEffect, useState } from "react"
import { resetGame } from "@/store/slices/gameSlice"
import { useAppDispatch, useAppSelector } from "@/store"

export default function ResultModal() {
  const dispatch = useAppDispatch()
  const { round, players, matchOver } = useAppSelector((state) => state.game)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (round === 5 && matchOver) {
      setIsOpen(true)
    }
  }, [matchOver, round])

  if (!isOpen) return null

  const finalWinnerIndex = players[0].score === players[1].score ? null : players[0].score > players[1].score ? 0 : 1

  const isDraw = finalWinnerIndex === null
  const winnerName = isDraw ? null : players[finalWinnerIndex].name

  const handleRestart = () => {
    dispatch(resetGame())
    setIsOpen(false)
  }

  return (
    <>
      <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black' onClick={() => setIsOpen(false)} />
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-lg' onClick={(e) => e.stopPropagation()}>
          <h2 className='mb-4 text-2xl font-bold'>Match Result</h2>

          {isDraw ? (
            <p className='mb-4 text-lg'>It's a Draw!</p>
          ) : (
            <p className='mb-4 text-lg'>
              Winner: <span className='font-semibold'>{winnerName}</span>
            </p>
          )}

          <div className='mb-6'>
            {players.map((player, i) => (
              <p key={i}>
                {player.name}: {player.score} points
              </p>
            ))}
          </div>

          <div className='flex justify-center'>
            <button onClick={handleRestart} className='rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700'>
              Restart Match
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
