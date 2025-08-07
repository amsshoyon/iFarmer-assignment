import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Player {
  name: string
  symbol: "X" | "O"
  score: number
}

interface GameState {
  board: string[]
  players: Player[]
  currentPlayer: number
  round: number
  matchOver: boolean
  winner: number | null
}

const initialState: GameState = {
  board: Array(9).fill(""),
  players: [
    { name: "", symbol: "X", score: 0 },
    { name: "", symbol: "O", score: 0 }
  ],
  currentPlayer: 0,
  round: 1,
  matchOver: false,
  winner: null
}

const checkWinner = (board: string[]) => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (const [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame(state, action: PayloadAction<{ player1: string; player2: string }>) {
      state.players = [
        { name: action.payload.player1, symbol: "X", score: 0 },
        { name: action.payload.player2, symbol: "O", score: 0 }
      ]
      state.board = Array(9).fill("")
      state.currentPlayer = 0
      state.round = 1
      state.matchOver = false
      state.winner = null
    },
    startNewMatch(state) {
      state.board = Array(9).fill("")
      state.matchOver = false
      state.winner = null
      state.currentPlayer = state.round % 2 === 1 ? 0 : 1
    },
    makeMove(state, action: PayloadAction<number>) {
      const idx = action.payload
      if (state.matchOver || state.board[idx]) return
      const symbol = state.players[state.currentPlayer].symbol
      state.board[idx] = symbol

      const winnerSymbol = checkWinner(state.board)
      if (winnerSymbol) {
        const winnerIdx = state.players.findIndex((p) => p.symbol === winnerSymbol)
        if (state.winner === null) {
          state.players[winnerIdx].score += 2
        }
        state.winner = winnerIdx
        state.matchOver = true
      } else if (!state.board.includes("")) {
        state.matchOver = true // draw
        state.winner = null
      } else {
        state.currentPlayer = 1 - state.currentPlayer
      }
    },
    resetBoard(state) {
      state.board = Array(9).fill("")
      state.matchOver = false
      state.winner = null
    },
    rematch(state) {
      state.board = Array(9).fill("")
      state.matchOver = false
      state.winner = null
      state.round += 1
      state.currentPlayer = state.round % 2 === 1 ? 0 : 1
    },
    resetGame() {
      return initialState
    }
  }
})

export const { startGame, makeMove, resetBoard, rematch, resetGame, startNewMatch } = gameSlice.actions
export default gameSlice.reducer
