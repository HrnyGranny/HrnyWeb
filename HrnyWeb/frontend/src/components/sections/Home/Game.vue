<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from "vue"

import {
  createInitialGame,
  createPopup,
  getDifficulty,
  loadLeaderboard,
  saveScore,
  STARTING_LIVES,
} from "@/assets/js/Game.js"

import BackGround from "@/assets/img/WindowsXP_Pixel2.jpeg"
import Button from "@/components/ui/Button.vue"
import TextBox from "@/components/ui/TextBox.vue"
import Window from "./Window.vue"

const emit = defineEmits(["close"])

const closeButton = ref(null)
const playerName = ref("")
const leaderboard = ref(loadLeaderboard())
const game = reactive(createInitialGame())

let timerId
let gameLoopId
let lastSpawnTime = 0

const hasName = computed(() => {
  return playerName.value.trim().length > 0
})

const difficulty = computed(() => {
  return getDifficulty(game.elapsedTime)
})

const formattedTime = computed(() => {
  const minutes = Math.floor(game.elapsedTime / 60)
  const seconds = game.elapsedTime % 60

  return `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`
})

const closeGame = () => {
  emit("close")
}

const clearGameTimers = () => {
  window.clearInterval(timerId)
  window.clearInterval(gameLoopId)

  timerId = undefined
  gameLoopId = undefined
}

const stopGame = () => {
  if (!game.isPlaying) {
    return
  }

  clearGameTimers()

  game.isPlaying = false
  game.isFinished = true
  game.lives = Math.max(0, game.lives)
  game.score = Math.max(0, game.score)
  game.popups = []

  leaderboard.value = saveScore(
    game.playerName,
    game.score,
    game.elapsedTime,
  )
}

const loseLife = () => {
  game.lives = Math.max(0, game.lives - 1)

  if (game.lives <= 0) {
    stopGame()
  }
}

const spawnPopup = () => {
  if (
    !game.isPlaying ||
    game.popups.length >= difficulty.value.maxPopups
  ) {
    return
  }

  game.popups.push(createPopup(difficulty.value))
}

const updatePopups = () => {
  if (!game.isPlaying) {
    return
  }

  const currentTime = Date.now()

  const expiredPopups = game.popups.filter((popup) => {
    return currentTime - popup.createdAt >= popup.lifetime
  })

  const missedDangerousPopups = expiredPopups.filter(
    (popup) => popup.type === "danger",
  )

  game.popups = game.popups.filter((popup) => {
    return currentTime - popup.createdAt < popup.lifetime
  })

  for (const popup of missedDangerousPopups) {
    if (!game.isPlaying) {
      break
    }

    loseLife()
  }

  if (!game.isPlaying) {
    return
  }

  if (
    currentTime - lastSpawnTime >=
    difficulty.value.spawnDelay
  ) {
    spawnPopup()
    lastSpawnTime = currentTime
  }
}

const startGame = () => {
  if (!hasName.value) {
    return
  }

  clearGameTimers()

  Object.assign(
    game,
    createInitialGame(playerName.value.trim()),
    {
      isPlaying: true,
    },
  )

  lastSpawnTime = Date.now()
  spawnPopup()

  timerId = window.setInterval(() => {
    game.elapsedTime += 1
  }, 1000)

  gameLoopId = window.setInterval(
    updatePopups,
    100,
  )
}

const handlePopup = (selectedPopup) => {
  if (!game.isPlaying) {
    return
  }

  game.popups = game.popups.filter((popup) => {
    return popup.id !== selectedPopup.id
  })

  if (selectedPopup.type === "danger") {
    game.score += selectedPopup.points
    return
  }

  loseLife()
}

const handleKeydown = (event) => {
  if (event.key === "Escape") {
    closeGame()
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown)
  closeButton.value?.$el?.focus()
})

onBeforeUnmount(() => {
  document.removeEventListener(
    "keydown",
    handleKeydown,
  )

  clearGameTimers()
})
</script>

<template>
  <Teleport to="body">
    <div
      class="game-modal"
      role="presentation"
      @click.self="closeGame"
    >
      <section
        class="game-modal__panel"
        :class="{
          'game-modal__panel--playing': game.isPlaying,
          'game-modal__panel--results': game.isFinished,
        }"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="game.isPlaying ? undefined : 'game-modal-title'"
        :aria-label="game.isPlaying ? 'Granny EXE game' : undefined"
        :style="{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.12), rgba(255,255,255,0.12)), url(${BackGround})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }"
      >
        <Button
          v-if="!game.isPlaying"
          ref="closeButton"
          class="game-modal__close"
          type="button"
          aria-label="Close game"
          @click="closeGame"
        >
          <span aria-hidden="true">×</span>
        </Button>

        <header
          v-if="!game.isPlaying && !game.isFinished"
          class="game-modal__header"
        >
          <h1
            id="game-modal-title"
            class="game-modal__title"
          >
            <span>Granny</span>
            <span>.exe</span>
          </h1>
        </header>

        <div
          v-if="!game.isPlaying && !game.isFinished"
          class="game-modal__setup"
        >
          <Window title="System instructions">
            <div class="game-modal__instructions">
              <div class="game-modal__rules">
                <div
                  class="game-modal__rule game-modal__rule--danger"
                >
                  <span
                    class="game-modal__rule-sample"
                    aria-hidden="true"
                  ></span>

                  <span>
                    Close
                    <strong>red popups</strong>
                  </span>
                </div>

                <span
                  class="game-modal__rule-divider"
                  aria-hidden="true"
                >
                  +
                </span>

                <div
                  class="game-modal__rule game-modal__rule--safe"
                >
                  <span
                    class="game-modal__rule-sample"
                    aria-hidden="true"
                  ></span>

                  <span>
                    Ignore
                    <strong>green messages</strong>
                  </span>
                </div>

                <span
                  class="game-modal__rule-divider"
                  aria-hidden="true"
                >
                  =
                </span>

                <div
                  class="game-modal__rule game-modal__rule--life"
                >
                  <span
                    class="game-modal__rule-heart"
                    aria-hidden="true"
                  >
                    ♥
                  </span>

                  <span>
                    Keep your
                    <strong>5 lives</strong>
                  </span>
                </div>
              </div>

              <p class="game-modal__instruction-note">
                The system gets faster while you survive
              </p>
            </div>
          </Window>

          <TextBox
            v-model="playerName"
            class="game-modal__name"
            placeholder="Player name"
            aria-label="Player name"
            maxlength="16"
            autocomplete="off"
            @keydown.enter="startGame"
          />

          <Button
            class="game-modal__start"
            :disabled="!hasName"
            @click="startGame"
          >
            Start game
          </Button>
        </div>

        <div
          v-else-if="game.isPlaying"
          class="game-modal__play"
        >
          <div
            class="game-modal__hud"
            aria-live="polite"
          >
            <div
              class="game-modal__hud-time"
              aria-label="Time"
            >
              <strong>{{ formattedTime }}</strong>
            </div>

            <div
              class="game-modal__hud-score"
              aria-label="Score"
            >
              <strong>{{ game.score }}</strong>
            </div>

            <div
              class="game-modal__hud-lives"
              aria-label="Lives"
            >
              <strong class="game-modal__lives">
                <span
                  v-for="life in STARTING_LIVES"
                  :key="life"
                  :class="{
                    'game-modal__life--lost':
                      life > game.lives,
                  }"
                >
                  ♥
                </span>
              </strong>
            </div>
          </div>

          <div
            class="game-board"
            aria-label="Granny EXE game area"
          >
            <TransitionGroup name="popup">
              <button
                v-for="popup in game.popups"
                :key="popup.id"
                class="game-popup"
                :class="`game-popup--${popup.type}`"
                type="button"
                :style="{
                  left: `${popup.x}%`,
                  top: `${popup.y}%`,
                }"
                :aria-label="`${popup.title}: ${popup.action}`"
                @click="handlePopup(popup)"
              >
                <span class="game-popup__bar">
                  <span>{{ popup.title }}</span>

                  <span class="game-popup__close">
                    ×
                  </span>
                </span>

                <span class="game-popup__content">
                  <span
                    class="game-popup__symbol"
                    aria-hidden="true"
                  >
                    {{ popup.symbol }}
                  </span>

                  <span class="game-popup__message">
                    {{ popup.message }}
                  </span>
                </span>

                <span class="game-popup__action">
                  {{ popup.action }}
                </span>
              </button>
            </TransitionGroup>
          </div>

        </div>

        <div
          v-else
          class="game-modal__leaderboard"
        >
          <h2 class="game-modal__leaderboard-title">
            GAME OVER
          </h2>

          <div class="game-modal__final-stats">
            <Window
              class="game-modal__stat-window"
              title="Final score"
            >
              <strong class="game-modal__stat-value">
                {{ game.score }}
              </strong>
            </Window>

            <Window
              class="game-modal__stat-window"
              title="Survival time"
            >
              <strong class="game-modal__stat-value">
                {{ formattedTime }}
              </strong>
            </Window>
          </div>

          <Window
            class="game-modal__leaderboard-window"
            title="Leaderboard"
          >
            <ol
              v-if="leaderboard.length"
              class="game-modal__scores"
            >
              <li
                v-for="(entry, index) in leaderboard"
                :key="`${entry.name}-${entry.score}-${entry.time}-${index}`"
              >
                <span class="game-modal__position">
                  #{{ index + 1 }}
                </span>

                <span class="game-modal__player">
                  {{ entry.name }}
                </span>

                <span class="game-modal__score">
                  {{ entry.score }}
                </span>

                <small>{{ entry.time ?? 0 }}s</small>
              </li>
            </ol>

            <p
              v-else
              class="game-modal__message"
            >
              No scores yet.
            </p>
          </Window>

          <Button
            class="game-modal__start"
            @click="startGame"
          >
            Play again
          </Button>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.game-modal {
  position: fixed;
  z-index: 200;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  overflow-y: auto;
  background-color: rgba(21, 23, 17, 0.82);
  backdrop-filter: blur(3px);
}

.game-modal__panel {
  position: relative;
  box-sizing: border-box;
  width: min(100%, 893px);
  padding: 48px 44px 40px;
  color: var(--ui-ink);
  text-align: center;
  background-color: var(--ui-surface);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: 4px solid var(--ui-ink);
  box-shadow:
    0 -6px rgba(0, 0, 0, 0.3) inset,
    0 6px rgba(255, 255, 255, 0.65) inset,
    -6px 0 rgba(255, 255, 255, 0.2) inset,
    6px 0 rgba(0, 0, 0, 0.2) inset,
    0 8px 0 rgba(0, 0, 0, 0.35);
}

.game-modal__panel--playing {
  display: flex;
  flex-direction: column;
  width: min(100%, 1100px);
  min-height: min(720px, calc(100vh - 48px));
  padding: 24px;
}

.game-modal__panel--results {
  width: min(100%, 960px);
  padding: 48px 56px 44px;
}

/* Botón de cierre */

.game-modal__close {
  --ui-btn-primary: #d83a3a;
  --ui-btn-primary-hi: #ff7b6f;
  --ui-btn-primary-lo: #7c1717;
  --ui-btn-ink: #1c1c1c;
  --ui-btn-text: #ffffff;

  position: absolute;
  z-index: 20;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  padding: 0;
  font-size: 20px;
  letter-spacing: 0;
  line-height: 1;
}

.game-modal__close :deep(.ui-btn__label) {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  transform: translateY(-1px);
}

/* Título */

.game-modal__header {
  margin-bottom: 30px;
  padding: 4px 48px 0;
}

.game-modal__title {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  margin: 0;
  font-family: "Press Start 2P", monospace;
  font-size: clamp(28px, 5vw, 48px);
  line-height: 1.4;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.game-modal__title span:first-child {
  color: var(--ui-primary);
  text-shadow:
    4px 4px 0 #176b2d,
    8px 8px 0 rgba(0, 0, 0, 0.25);
}

.game-modal__title span:last-child {
  color: #d83a3a;
  font-size: 0.64em;
  text-shadow:
    3px 3px 0 #7c1717,
    6px 6px 0 rgba(0, 0, 0, 0.25);
}

/* Instrucciones */

.game-modal__setup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  width: min(100%, 760px);
  margin: 0 auto;
  padding: 18px 16px 24px;
  background: transparent;
  border: 0;
  box-shadow: none;
}

.game-modal__instructions {
  width: 100%;
  margin: 0;
  overflow: hidden;
  color: var(--ui-ink);
  background-color: #dfe4df;
  border: 0;
  text-align: left;
}

.game-modal__rules {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    auto
    minmax(0, 1fr)
    auto
    minmax(0, 1fr);
  align-items: center;
  gap: 14px;
  padding: 24px 22px 20px;
}

.game-modal__rule {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-width: 0;
  color: var(--ui-ink);
  font-family: "VT323", monospace;
  font-size: 18px;
  line-height: 1.15;
}

.game-modal__rule > span:last-child {
  min-width: 0;
}

.game-modal__rule strong {
  display: block;
  margin-top: 3px;
  color: var(--ui-ink);
  font-family: "Silkscreen", monospace;
  font-size: 8px;
  line-height: 1.4;
  text-transform: uppercase;
}

.game-modal__rule-sample {
  display: block;
  flex: 0 0 30px;
  width: 30px;
  height: 30px;
  border: 2px solid var(--ui-ink);
  box-shadow:
    0 -3px rgba(0, 0, 0, 0.35) inset,
    0 3px rgba(255, 255, 255, 0.25) inset,
    -3px 0 rgba(255, 255, 255, 0.15) inset,
    3px 0 rgba(0, 0, 0, 0.25) inset,
    0 3px 0 rgba(0, 0, 0, 0.25);
}

.game-modal__rule--danger
  .game-modal__rule-sample {
  background-color: #d83a3a;
}

.game-modal__rule--safe
  .game-modal__rule-sample {
  background-color: var(--ui-primary);
}

.game-modal__rule-heart {
  display: grid;
  place-items: center;
  flex: 0 0 36px;
  width: 36px;
  height: 36px;
  color: #d83a3a;
  font-family: "Press Start 2P", monospace;
  font-size: 17px;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.25);
}

.game-modal__rule-divider {
  color: var(--ui-muted);
  font-family: "Press Start 2P", monospace;
  font-size: 12px;
  opacity: 0.55;
}

.game-modal__instruction-note {
  margin: 0;
  padding: 10px 12px;
  color: var(--ui-ink);
  background-color: #dfe4df;
  border-top: 2px dashed rgba(0, 0, 0, 0.35);
  font-family: "Silkscreen", monospace;
  font-size: 8px;
  line-height: 1.4;
  text-align: center;
  text-transform: uppercase;
}

/* Nombre y botón */

.game-modal__name {
  display: block;
  width: min(100%, 340px);
  margin: 0 auto;
}

.game-modal__name :deep(.ui-field__input) {
  text-align: center;
}

.game-modal__start {
  display: flex;
  margin: 0 auto;
}

.game-modal__leaderboard .game-modal__start {
  margin-top: 24px;
}

/* HUD del juego */

.game-modal__hud {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 18px;
  min-height: 70px;
  margin-bottom: 16px;
}

.game-modal__panel--playing .game-modal__play {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
}

.game-modal__hud-time,
.game-modal__hud-lives {
  display: flex;
  align-items: center;
  color: var(--ui-muted);
  font-family: "Press Start 2P", monospace;
  font-size: 16px;
  text-transform: uppercase;
}

.game-modal__hud-time {
  justify-content: flex-start;
  text-align: left;
}

.game-modal__hud-lives {
  justify-content: flex-end;
  text-align: right;
}

.game-modal__hud-time strong {
  color: var(--ui-ink);
  font-size: 16px;
  letter-spacing: 1px;
}

/* Score central destacado */

.game-modal__hud-score {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 114px;
  min-height: 43px;
  padding: 6px 14px;
  color: var(--ui-ink);
  background-color: var(--ui-primary);
  border: 2px solid var(--ui-ink);
  font-family: "Silkscreen", monospace;
  text-transform: uppercase;
  box-shadow:
    0 -4px var(--ui-primary-lo) inset,
    0 4px var(--ui-primary-hi) inset,
    -4px 0 var(--ui-primary-hi) inset,
    4px 0 var(--ui-primary-lo) inset,
    0 5px 0 rgba(0, 0, 0, 0.3);
}

.game-modal__hud-score strong {
  margin-top: 0;
  color: var(--ui-white);
  font-family: "Press Start 2P", monospace;
  font-size: 24px;
  line-height: 1;
  text-shadow: 3px 3px 0 #176b2d;
}

/* Vidas */

.game-modal__lives {
  display: inline-flex;
  gap: 6px;
  color: #e13b3b;
  font-family: "Press Start 2P", monospace;
  font-size: 17px;
  line-height: 1;
  text-shadow:
    2px 2px 0 #7c1717,
    3px 3px 0 rgba(0, 0, 0, 0.2);
}

.game-modal__life--lost {
  color: rgba(109, 85, 38, 0.22);
  text-shadow: none;
}

/* Tablero */

.game-board {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background-color: #446b77;
  border: 3px solid var(--ui-ink);
  background-image:
    linear-gradient(
      rgba(255, 255, 255, 0.04) 2px,
      transparent 2px
    ),
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04) 2px,
      transparent 2px
    );
  background-size: 24px 24px;
  box-shadow:
    0 5px rgba(0, 0, 0, 0.35) inset,
    0 -5px rgba(255, 255, 255, 0.12) inset;
}

.game-modal__panel--playing .game-board {
  flex: 1;
  height: auto;
  min-height: 0;
  background-color: transparent;
  background-image: none;
  border: 0;
  box-shadow: none;
}

/* Popups */

.game-popup {
  position: absolute;
  z-index: 2;
  width: 190px;
  padding: 0 0 10px;
  color: var(--ui-ink);
  background-color: var(--ui-surface);
  border: 3px solid var(--ui-ink);
  cursor: pointer;
  text-align: left;
  transform: scale(1);
  box-shadow:
    0 -4px rgba(0, 0, 0, 0.25) inset,
    0 4px rgba(255, 255, 255, 0.65) inset,
    5px 6px 0 rgba(0, 0, 0, 0.35);
}

.game-popup:hover {
  z-index: 10;
  transform: translateY(-2px);
}

.game-popup:active {
  transform: translateY(3px);
  box-shadow:
    0 -4px rgba(0, 0, 0, 0.25) inset,
    0 4px rgba(255, 255, 255, 0.65) inset;
}

.game-popup__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 29px;
  padding: 5px 7px;
  color: #ffffff;
  background-color: #d83a3a;
  border-bottom: 3px solid var(--ui-ink);
  font-family: "Silkscreen", monospace;
  font-size: 8px;
  line-height: 1.2;
}

.game-popup--safe .game-popup__bar {
  background-color: var(--ui-primary);
}

.game-popup__close {
  display: grid;
  place-items: center;
  flex: 0 0 18px;
  width: 18px;
  height: 18px;
  margin-left: 6px;
  color: var(--ui-ink);
  background-color: var(--ui-surface);
  border: 2px solid var(--ui-ink);
  font-size: 12px;
}

.game-popup__content {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 10px 7px;
}

.game-popup__symbol {
  display: grid;
  place-items: center;
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  color: #ffffff;
  background-color: #d83a3a;
  border: 2px solid var(--ui-ink);
  font-family: "Press Start 2P", monospace;
  font-size: 8px;
}

.game-popup--safe .game-popup__symbol {
  background-color: var(--ui-primary);
}

.game-popup__message {
  font-family: "VT323", monospace;
  font-size: 17px;
  line-height: 1.1;
}

.game-popup__action {
  display: block;
  width: fit-content;
  margin: 0 auto;
  padding: 4px 8px;
  color: var(--ui-ink);
  background-color: var(--ui-gold);
  border: 2px solid var(--ui-ink);
  font-family: "Silkscreen", monospace;
  font-size: 7px;
  text-transform: uppercase;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.25);
}

.game-popup:focus-visible {
  z-index: 15;
  outline: 3px solid #ffffff;
  outline-offset: 3px;
}

/* Animaciones */

.popup-enter-active,
.popup-leave-active {
  transition:
    opacity 120ms linear,
    transform 120ms steps(3);
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

/* Resultados */

.game-modal__leaderboard-title {
  margin: 0;
  color: #d83a3a;
  font-family: "Press Start 2P", monospace;
  font-size: clamp(18px, 4vw, 28px);
  line-height: 1.4;
  text-transform: uppercase;
  text-shadow:
    3px 3px 0 #7c1717,
    6px 6px 0 rgba(0, 0, 0, 0.18);
}

.game-modal__final-stats {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 22px;
}

.game-modal__leaderboard-window {
  width: min(100%, 720px);
  margin: 24px auto 0;
}

.game-modal__leaderboard-window :deep(.xp-window__body) {
  background-color: #dfe4df;
}

.game-modal__stat-window {
  width: min(100%, 180px);
}

.game-modal__stat-window :deep(.xp-window__body) {
  padding: 12px 14px;
}

.game-modal__stat-value {
  display: block;
  color: var(--ui-primary);
  font-family: "Press Start 2P", monospace;
  font-size: 15px;
  line-height: 1.2;
}

.game-modal__message {
  margin: 20px auto 0;
  color: var(--ui-muted);
  font-size: 23px;
  line-height: 1.4;
}

.game-modal__scores {
  width: 90%;
  max-width: 520px;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  color: var(--ui-ink);
  font-family: "Silkscreen", monospace;
  font-size: 10px;
  list-style: none;
  text-align: left;
}

.game-modal__scores li {
  display: grid;
  grid-template-columns: 40px 1fr auto 48px;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-bottom: 2px dashed rgba(109, 85, 38, 0.4);
}

.game-modal__scores li:last-child {
  border-bottom: 0;
}

.game-modal__scores li:first-child {
  color: var(--ui-primary);
  background-color: rgba(47, 168, 79, 0.08);
}

.game-modal__position {
  color: var(--ui-muted);
  font-size: 9px;
}

.game-modal__player {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.game-modal__score {
  color: var(--ui-ink);
  font-weight: 700;
}

.game-modal__scores small {
  color: var(--ui-muted);
  font-size: 8px;
  text-align: right;
}

/* Responsive */

@media (max-width: 920px) {
  .game-modal {
    padding: 14px;
  }

  .game-modal__panel {
    padding: 52px 24px 28px;
  }

  .game-board {
    height: 360px;
  }

  .game-modal__panel--playing {
    min-height: calc(100vh - 28px);
    padding: 18px;
  }
}

@media (max-width: 760px) {
  .game-modal__header {
    padding: 0 44px;
  }

  .game-modal__rules {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 18px;
  }

  .game-modal__rule {
    justify-content: flex-start;
    width: 100%;
  }

  .game-modal__rule-divider {
    display: none;
  }

  .game-modal__hud {
    grid-template-columns: 1fr auto 1fr;
    gap: 10px;
  }

  .game-modal__hud-score {
    min-width: 96px;
  }

  .game-board {
    height: 340px;
  }

  .game-popup {
    width: 170px;
  }
}

@media (max-width: 600px) {
  .game-modal {
    place-items: start center;
    padding: 10px;
  }

  .game-modal__panel {
    width: 100%;
    margin: 8px 0;
    padding: 52px 12px 22px;
  }

  .game-modal__panel--playing {
    min-height: calc(100vh - 20px);
    padding: 18px 10px 14px;
  }

  .game-modal__close {
    top: 10px;
    right: 10px;
  }

  .game-modal__header {
    margin-bottom: 26px;
    padding: 0 42px 0 0;
  }

  .game-modal__title {
    justify-content: flex-start;
    font-size: clamp(22px, 8vw, 34px);
  }

  .game-modal__instructions {
    margin-bottom: 22px;
  }

  .game-modal__rules {
    gap: 12px;
    padding: 16px 14px;
  }

  .game-modal__rule {
    font-size: 17px;
  }

  .game-modal__rule strong {
    font-size: 8px;
  }

  .game-modal__instruction-note {
    padding: 8px 10px;
    font-size: 7px;
  }

  .game-modal__hud {
    grid-template-columns: 1fr auto 1fr;
    gap: 5px;
    min-height: 62px;
  }

  .game-modal__hud-time,
  .game-modal__hud-lives {
    flex-direction: column;
    gap: 0;
    font-size: 14px;
  }

  .game-modal__hud-time {
    align-items: flex-start;
  }

  .game-modal__hud-lives {
    align-items: flex-end;
  }

  .game-modal__hud-time strong {
    font-size: 14px;
  }

  .game-modal__hud-score {
    min-width: 72px;
    min-height: 37px;
    padding: 5px 8px;
  }

  .game-modal__hud-score strong {
    margin-top: 0;
    font-size: 20px;
  }

  .game-modal__lives {
    gap: 2px;
    font-size: 17px;
  }

  .game-board {
    height: 350px;
  }

  .game-popup {
    width: 148px;
  }

  .game-popup__bar {
    font-size: 7px;
  }

  .game-popup__content {
    gap: 6px;
    padding: 8px 7px 6px;
  }

  .game-popup__symbol {
    flex-basis: 30px;
    width: 30px;
    height: 30px;
    font-size: 7px;
  }

  .game-popup__message {
    font-size: 14px;
  }

  .game-modal__final-stats {
    flex-direction: column;
  }

  .game-modal__scores {
    font-size: 8px;
  }

  .game-modal__scores li {
    grid-template-columns: 30px 1fr auto 36px;
    gap: 7px;
    padding: 10px 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .popup-enter-active,
  .popup-leave-active,
  .game-popup {
    transition: none;
  }
}
</style>