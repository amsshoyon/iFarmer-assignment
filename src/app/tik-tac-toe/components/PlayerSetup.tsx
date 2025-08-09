"use client"
import { useState } from "react"
import { useAppDispatch } from "@/store"
import { startGame } from "@/store/slices/gameSlice"

const PlayerSetup = () => {
  const [player1, setPlayer1] = useState("")
  const [player2, setPlayer2] = useState("")
  const dispatch = useAppDispatch()

  const handleStart = () => {
    dispatch(startGame({ player1, player2 }))
  }

  return (
    <div className='mx-auto mt-10 flex max-w-[500px] flex-col gap-2 p-4'>
      <h1 className='text-2xl font-semibold'>Enter Player Names</h1>
      <div className='flex flex-col gap-2'>
        <label htmlFor='player1'>Player 1</label>
        <input className='mb-4 w-full border p-2' type='text' id='player-1' value={player1} onChange={(e) => setPlayer1(e.target.value)} />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='player2'>Player 2</label>
        <input className='mb-4 w-full border p-2' type='text' id='player2' value={player2} onChange={(e) => setPlayer2(e.target.value)} />
      </div>

      <button disabled={!player1 || !player2} onClick={handleStart} className='btn bg-blue-950 text-white'>
        Start Match
      </button>
    </div>
  )
}

export default PlayerSetup
