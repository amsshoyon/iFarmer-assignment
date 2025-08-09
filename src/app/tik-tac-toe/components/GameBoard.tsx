import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { makeMove, rematch, resetBoard, startNewMatch } from "@/store/slices/gameSlice"

const GameBoard = () => {
  const { board, currentPlayer, players, round, matchOver } = useAppSelector((state) => state.game)
  const dispatch = useAppDispatch()

  const handleClick = (idx: number) => {
    if (matchOver || board[idx]) return
    dispatch(makeMove(idx))
  }

  const handleReset = () => {
    dispatch(resetBoard())
  }

  const handleRematch = () => {
    dispatch(rematch())
  }

  useEffect(() => {
    dispatch(startNewMatch())
  }, [dispatch])

  return (
    <div>
      <h2 className='mb-4 text-xl font-bold'>Round {round}</h2>
      {!matchOver && (
        <p className='mb-4'>
          Current Turn for:{" "}
          <span className='font-semibold'>
            {players[currentPlayer].name} - ({players[currentPlayer].symbol})
          </span>
        </p>
      )}

      <div className='mb-4 grid w-[300px] grid-cols-3 gap-x-2 gap-y-1'>
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className='flex h-24 w-24 items-center justify-center border text-2xl font-bold'
            disabled={!!cell || matchOver}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className='flex gap-4'>
        <button onClick={handleReset} className='btn'>
          Reset
        </button>
        {matchOver && (
          <button onClick={handleRematch} className='btn bg-red-800 text-white'>
            Rematch
          </button>
        )}
      </div>
    </div>
  )
}

export default GameBoard
