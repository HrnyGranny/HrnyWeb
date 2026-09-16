export const GAME_DURATION = 20
const LEADERBOARD_KEY = "hrnygranny-pixel-hunt-leaderboard"

export const createTargetPosition = () => ({
  x: Math.floor(Math.random() * 82) + 9,
  y: Math.floor(Math.random() * 66) + 17,
})

export const createInitialGame = (playerName = "") => ({
  playerName,
  score: 0,
  timeLeft: GAME_DURATION,
  isPlaying: false,
  isFinished: false,
  target: createTargetPosition(),
})

export const loadLeaderboard = () => {
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]")
  } catch {
    return []
  }
}

export const saveScore = (playerName, score) => {
  const leaderboard = [
    ...loadLeaderboard(),
    { name: playerName, score },
  ]
    .sort((first, second) => second.score - first.score)
    .slice(0, 5)

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard))
  return leaderboard
}
