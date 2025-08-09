import React from "react"
import { useAppSelector } from "@/store"

const ScoreCard = () => {
  const { players } = useAppSelector((state) => state.game)
  return (
    <div>
      <h3 className='mb-3 text-xl font-semibold'>Scores</h3>
      <ul className='flex flex-col gap-2'>
        {players.map((p, i) => (
          <li key={i}>
            <strong>{p.name}</strong>: {p.score} pts
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ScoreCard
