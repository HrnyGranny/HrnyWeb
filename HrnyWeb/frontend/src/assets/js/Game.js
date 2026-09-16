export const STARTING_LIVES = 5

const LEADERBOARD_KEY = "hrnygranny-exe-leaderboard"

const popupTypes = [
  {
    title: "VIRUS DETECTED",
    message: "Suspicious file found.",
    action: "REMOVE",
    type: "danger",
    symbol: "!",
    points: 20,
    lifetime: 5000,
  },
  {
    title: "ERROR 404",
    message: "Page escaped again.",
    action: "FIX",
    type: "danger",
    symbol: "404",
    points: 15,
    lifetime: 5400,
  },
  {
    title: "MEMORY LEAK",
    message: "RAM is disappearing.",
    action: "PATCH",
    type: "danger",
    symbol: "RAM",
    points: 25,
    lifetime: 4600,
  },
  {
    title: "FREE COOKIES",
    message: "Definitely not suspicious.",
    action: "DELETE",
    type: "danger",
    symbol: "CK",
    points: 10,
    lifetime: 5800,
  },
  {
    title: "FIREWALL DOWN",
    message: "Network is exposed.",
    action: "ENABLE",
    type: "danger",
    symbol: "FW",
    points: 30,
    lifetime: 4200,
  },
  {
    title: "DEPLOY COMPLETE",
    message: "Everything works somehow.",
    action: "OK",
    type: "safe",
    symbol: "OK",
    points: 0,
    lifetime: 4200,
  },
  {
    title: "BACKUP FINISHED",
    message: "Your files are safe.",
    action: "OK",
    type: "safe",
    symbol: "BK",
    points: 0,
    lifetime: 4200,
  },
  {
    title: "UPDATE READY",
    message: "System is up to date.",
    action: "LATER",
    type: "safe",
    symbol: "UP",
    points: 0,
    lifetime: 4400,
  },
  {
    title: "COFFEE READY",
    message: "Granny's coffee is ready.",
    action: "NICE",
    type: "safe",
    symbol: "CF",
    points: 0,
    lifetime: 4600,
  },
]

const randomBetween = (minimum, maximum) => {
  return (
    Math.floor(
      Math.random() * (maximum - minimum + 1),
    ) + minimum
  )
}

const selectRandomPopup = () => {
  const index = randomBetween(0, popupTypes.length - 1)
  return popupTypes[index]
}

export const getDifficulty = (elapsedTime) => {
  if (elapsedTime >= 75) {
    return {
      name: "NIGHTMARE",
      spawnDelay: 350,
      lifetimeMultiplier: 0.46,
      maxPopups: 8,
    }
  }

  if (elapsedTime >= 60) {
    return {
      name: "CHAOS",
      spawnDelay: 450,
      lifetimeMultiplier: 0.54,
      maxPopups: 7,
    }
  }

  if (elapsedTime >= 45) {
    return {
      name: "CRITICAL",
      spawnDelay: 600,
      lifetimeMultiplier: 0.64,
      maxPopups: 6,
    }
  }

  if (elapsedTime >= 30) {
    return {
      name: "WARNING",
      spawnDelay: 800,
      lifetimeMultiplier: 0.76,
      maxPopups: 6,
    }
  }

  if (elapsedTime >= 15) {
    return {
      name: "BUSY",
      spawnDelay: 1050,
      lifetimeMultiplier: 0.88,
      maxPopups: 5,
    }
  }

  return {
    name: "STABLE",
    spawnDelay: 1400,
    lifetimeMultiplier: 1,
    maxPopups: 4,
  }
}

export const createPopup = (difficulty) => {
  const popup = selectRandomPopup()
  const lifetimeMultiplier =
    difficulty?.lifetimeMultiplier ?? 1

  return {
    ...popup,
    id: `${Date.now()}-${Math.random()}`,
    x: randomBetween(3, 70),
    y: randomBetween(4, 62),
    createdAt: Date.now(),
    lifetime: Math.round(
      popup.lifetime * lifetimeMultiplier,
    ),
  }
}

export const createInitialGame = (playerName = "") => ({
  playerName,
  score: 0,
  lives: STARTING_LIVES,
  elapsedTime: 0,
  isPlaying: false,
  isFinished: false,
  popups: [],
})

export const loadLeaderboard = () => {
  try {
    const storedLeaderboard = localStorage.getItem(
      LEADERBOARD_KEY,
    )

    const parsedLeaderboard = JSON.parse(
      storedLeaderboard || "[]",
    )

    return Array.isArray(parsedLeaderboard)
      ? parsedLeaderboard
      : []
  } catch {
    return []
  }
}

export const saveScore = (
  playerName,
  score,
  elapsedTime,
) => {
  const safeName =
    playerName.trim().slice(0, 16) || "PLAYER"

  const safeScore = Math.max(0, score)
  const safeTime = Math.max(0, elapsedTime)

  const leaderboard = [
    ...loadLeaderboard(),
    {
      name: safeName,
      score: safeScore,
      time: safeTime,
    },
  ]
    .sort((first, second) => {
      if (second.score !== first.score) {
        return second.score - first.score
      }

      return second.time - first.time
    })
    .slice(0, 5)

  localStorage.setItem(
    LEADERBOARD_KEY,
    JSON.stringify(leaderboard),
  )

  return leaderboard
}