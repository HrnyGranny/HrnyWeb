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
        class="game-monitor"
        :class="{
          'game-monitor--playing': game.isPlaying,
          'game-monitor--results': game.isFinished,
        }"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="
          game.isPlaying ? undefined : 'game-modal-title'
        "
        :aria-label="
          game.isPlaying ? 'Granny EXE game' : undefined
        "
      >
        <div class="game-monitor__bezel">
          <main
            class="game-monitor__screen"
            :style="{
              backgroundImage: `url(${BackGround})`,
            }"
          >
            <div
              class="game-monitor__screen-effect"
              aria-hidden="true"
            ></div>

            <!-- Pantalla inicial -->

            <div
              v-if="!game.isPlaying && !game.isFinished"
              class="game-desktop game-desktop--setup"
            >
              <header class="game-modal__header">
                <h1
                  id="game-modal-title"
                  class="game-modal__title"
                >
                  <span>Granny</span>
                  <span>.exe</span>
                </h1>
              </header>

              <Window
                class="xp-window--instructions"
                title="System instructions"
              >
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
                        <strong>
                          {{ STARTING_LIVES }} lives
                        </strong>
                      </span>
                    </div>
                  </div>

                  <p class="game-modal__instruction-note">
                    The system gets faster while you survive
                  </p>
              </Window>

              <div class="game-modal__setup-controls">
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
            </div>

            <!-- Partida -->

            <div
              v-else-if="game.isPlaying"
              class="game-desktop game-desktop--playing"
              aria-label="Granny EXE game area"
            >
              <div
                class="game-monitor__hud"
                aria-live="polite"
              >
                <div
                  class="game-monitor__stat game-monitor__stat--time"
                  aria-label="Time"
                >
                  <span class="game-monitor__stat-label">
                    Time
                  </span>

                  <strong>{{ formattedTime }}</strong>
                </div>

                <div
                  class="game-monitor__stat game-monitor__stat--score"
                  aria-label="Score"
                >
                  <span class="game-monitor__stat-label">
                    Score
                  </span>

                  <strong>{{ game.score }}</strong>
                </div>

                <div
                  class="game-monitor__stat game-monitor__stat--lives"
                  aria-label="Lives"
                >
                  <span class="game-monitor__stat-label">
                    Lives
                  </span>

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

              <TransitionGroup name="popup">
                <Window
                  v-for="popup in game.popups"
                  :key="popup.id"
                  as="button"
                  variant="popup"
                  class="game-popup"
                  :class="`game-popup--${popup.type}`"
                  type="button"
                  :style="{
                    left: `${popup.x}%`,
                    top: `${popup.y}%`,
                  }"
                  :aria-label="
                    `${popup.title}: ${popup.action}`
                  "
                  @click="handlePopup(popup)"
                >
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
                </Window>
              </TransitionGroup>
            </div>

            <!-- Resultados -->

            <div
              v-else
              class="game-desktop game-desktop--results"
            >
              <h2
                id="game-modal-title"
                class="game-modal__leaderboard-title"
              >
                Game Over
              </h2>

              <div class="game-modal__result-windows">
                <Window
                  variant="stat"
                  title="Final score"
                >
                  <strong class="game-modal__stat-value">
                    {{ game.score }}
                  </strong>
                </Window>

                <Window
                  variant="stat"
                  title="Survival time"
                >
                  <strong class="game-modal__stat-value">
                    {{ formattedTime }}
                  </strong>
                </Window>
              </div>

              <Window
                class="xp-window--leaderboard"
                title="Leaderboard"
              >
                  <ol
                    v-if="leaderboard.length"
                    class="game-modal__scores"
                  >
                    <li
                      v-for="(entry, index) in leaderboard"
                      :key="
                        `${entry.name}-${entry.score}-${entry.time}-${index}`
                      "
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

                      <small>
                        {{ entry.time ?? 0 }}s
                      </small>
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
                class="game-modal__start game-modal__start--again"
                @click="startGame"
              >
                Play again
              </Button>
            </div>
          </main>
        </div>

        <footer class="game-monitor__controls">
          <div class="game-monitor__brand">
            <span class="game-monitor__brand-mark">
              HG
            </span>

            <span>HrnyVision</span>
          </div>

          <div class="game-monitor__buttons">
            <span
              class="game-monitor__speaker"
              aria-hidden="true"
            ></span>

            <span
              class="game-monitor__power-light"
              :class="{
                'game-monitor__power-light--error':
                  game.isFinished,
              }"
              aria-hidden="true"
            ></span>

            <span
              class="game-monitor__power"
              aria-hidden="true"
            ></span>
          </div>
        </footer>
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
  background-color: rgba(21, 23, 17, 0.84);
  backdrop-filter: blur(3px);
}

/* El propio modal es el monitor */

.game-monitor {
  position: relative;
  box-sizing: border-box;
  width: min(100%, 960px);
  padding: 18px 18px 0;
  color: var(--ui-ink);
  background-color: #d2c79d;
  border: 4px solid var(--ui-ink);
  box-shadow:
    0 7px rgba(96, 79, 40, 0.65) inset,
    7px 0 rgba(96, 79, 40, 0.35) inset,
    -7px 0 rgba(255, 255, 255, 0.38) inset,
    0 10px 0 rgba(0, 0, 0, 0.4);
}

.game-monitor--playing {
  width: min(100%, 1100px);
}

.game-monitor--results {
  width: min(100%, 920px);
}

.game-monitor__bezel {
  padding: 11px;
  background-color: #2d3028;
  border: 3px solid var(--ui-ink);
  box-shadow:
    0 6px rgba(0, 0, 0, 0.7) inset,
    6px 0 rgba(0, 0, 0, 0.5) inset,
    -6px 0 rgba(255, 255, 255, 0.08) inset,
    0 -6px rgba(255, 255, 255, 0.08) inset;
}

.game-monitor__screen {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 2752 / 1536;
  overflow: hidden;
  color: var(--ui-ink);
  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 3px solid #10120e;
  box-shadow:
    0 5px rgba(0, 0, 0, 0.38) inset,
    5px 0 rgba(0, 0, 0, 0.26) inset,
    -5px 0 rgba(255, 255, 255, 0.08) inset;
}

.game-monitor__screen-effect {
  position: absolute;
  z-index: 1;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.04) 0,
      rgba(0, 0, 0, 0.04) 1px,
      transparent 1px,
      transparent 4px
    ),
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04),
      transparent 14%,
      transparent 86%,
      rgba(0, 0, 0, 0.12)
    );
}

/* Escritorios */

.game-desktop {
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.game-desktop--setup,
.game-desktop--results {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 38px 34px 34px;
}

.game-desktop--playing {
  padding: 104px 0 0;
}

/* Título */

.game-modal__header {
  position: relative;
  z-index: 3;
  margin-bottom: 28px;
  padding: 0 54px;
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
  color: #f5f0dc;
  text-shadow:
    4px 4px 0 var(--ui-primary),
    8px 8px 0 rgba(0, 0, 0, 0.35);
}

.game-modal__title span:last-child {
  color: #f6c85f;
  font-size: 0.64em;
  text-shadow:
    3px 3px 0 #a96214,
    6px 6px 0 rgba(0, 0, 0, 0.35);
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
  padding: 26px 24px 22px;
}

.game-modal__rule {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 0;
  color: var(--ui-ink);
  font-family: "VT323", monospace;
  font-size: 19px;
  line-height: 1.15;
  text-align: left;
}

.game-modal__rule > span:last-child {
  min-width: 0;
}

.game-modal__rule strong {
  display: block;
  margin-top: 4px;
  color: var(--ui-ink);
  font-family: "Silkscreen", monospace;
  font-size: 8px;
  line-height: 1.4;
  text-transform: uppercase;
  white-space: nowrap;
}

.game-modal__rule-sample {
  display: block;
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
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
  font-size: 18px;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.25);
}

.game-modal__rule-divider {
  color: var(--ui-muted);
  font-family: "Press Start 2P", monospace;
  font-size: 12px;
  opacity: 0.6;
}

.game-modal__instruction-note {
  margin: 0;
  padding: 11px 12px;
  color: var(--ui-ink);
  background-color: #ced8cf;
  border-top: 2px dashed rgba(0, 0, 0, 0.35);
  font-family: "Silkscreen", monospace;
  font-size: 8px;
  line-height: 1.4;
  text-align: center;
  text-transform: uppercase;
}

/* Nombre y botón sobre el fondo */

.game-modal__setup-controls {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: min(100%, 340px);
  margin-top: 28px;
}

.game-modal__name {
  display: block;
  width: 100%;
}

.game-modal__name :deep(.ui-field__input) {
  text-align: center;
}

.game-modal__start {
  display: flex;
  margin: 0;
}

/* HUD dentro de la pantalla */

.game-monitor__hud {
  position: absolute;
  z-index: 20;
  top: 16px;
  left: 20px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 18px;
  box-sizing: border-box;
  width: calc(100% - 40px);
  min-height: 66px;
  padding: 7px 14px;
}

.game-monitor__stat {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: "Press Start 2P", monospace;
  text-transform: uppercase;
}

.game-monitor__stat--time {
  align-items: flex-start;
  text-align: left;
}

.game-monitor__stat--lives {
  align-items: flex-end;
  text-align: right;
}

.game-monitor__stat--time .game-monitor__stat-label,
.game-monitor__stat--lives .game-monitor__stat-label,
.game-monitor__stat--time strong {
  color: #1c1c1c;
}

.game-monitor__stat-label {
  color: var(--ui-muted);
  font-family: "Silkscreen", monospace;
  font-size: 7px;
  letter-spacing: 1px;
}

.game-monitor__stat--time strong {
  color: var(--ui-ink);
  font-size: 14px;
  letter-spacing: 1px;
}

.game-monitor__stat--score {
  align-items: center;
  justify-content: center;
  min-width: 126px;
  min-height: 48px;
  padding: 5px 16px;
  color: var(--ui-ink);
  background-color: var(--ui-primary);
  border: 2px solid var(--ui-ink);
  box-shadow:
    0 -4px rgba(21, 108, 0, 0.5) inset,
    0 4px rgba(100, 253, 31, 0.65) inset,
    -4px 0 rgba(100, 253, 31, 0.35) inset,
    4px 0 rgba(21, 108, 0, 0.5) inset,
    0 4px 0 rgba(0, 0, 0, 0.25);
}

.game-monitor__stat--score
  .game-monitor__stat-label {
  color: var(--ui-ink);
  opacity: 0.72;
}

.game-monitor__stat--score strong {
  color: var(--ui-white);
  font-size: 21px;
  line-height: 1;
  text-shadow: 3px 3px 0 #176b2d;
}

.game-modal__lives {
  display: inline-flex;
  gap: 5px;
  color: #e13b3b;
  font-family: "Press Start 2P", monospace;
  font-size: 16px;
  line-height: 1;
  text-shadow:
    2px 2px 0 #7c1717,
    3px 3px 0 rgba(0, 0, 0, 0.2);
}

.game-modal__life--lost {
  color: rgba(109, 85, 38, 0.3);
  text-shadow: none;
}

/* Popups */

.game-popup {
  position: absolute;
  z-index: 3;
  width: 190px;
  padding: 0 0 10px;
  color: #1c1c1c;
  background-color: #dfe4df;
  border: 2px solid #1c1c1c;
  cursor: pointer;
  text-align: left;
  transform: scale(1);
  box-shadow:
    0 -4px rgba(0, 0, 0, 0.25) inset,
    0 4px rgba(255, 255, 255, 0.65) inset,
    5px 6px 0 rgba(0, 0, 0, 0.35);
}

.game-popup:hover {
  z-index: 12;
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

/* Resultados */

.game-modal__leaderboard-title {
  position: relative;
  z-index: 3;
  margin: 0 0 24px;
  color: #ffffff;
  font-family: "Press Start 2P", monospace;
  font-size: clamp(18px, 4vw, 30px);
  line-height: 1.4;
  text-transform: uppercase;
  text-shadow:
    3px 3px 0 #7c1717,
    6px 6px 0 rgba(0, 0, 0, 0.34);
}

.game-modal__result-windows {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(2, 220px);
  justify-content: center;
  gap: 18px;
  width: 100%;
}

.game-modal__stat-value {
  color: var(--ui-primary);
  font-family: "Press Start 2P", monospace;
  font-size: 19px;
  line-height: 1.2;
  text-shadow: 3px 3px 0 rgba(23, 107, 45, 0.2);
}

.game-modal__scores {
  width: 100%;
  margin: 0;
  padding: 0;
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

.game-modal__message {
  margin: 18px auto;
  color: var(--ui-muted);
  font-family: "VT323", monospace;
  font-size: 23px;
}

.game-modal__start--again {
  position: relative;
  z-index: 3;
  margin-top: 24px;
}

/* Controles físicos del monitor */

.game-monitor__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  padding: 6px 10px 8px;
}

.game-monitor__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6d5526;
  font-family: "Silkscreen", monospace;
  font-size: 7px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.game-monitor__brand-mark {
  display: grid;
  place-items: center;
  width: 23px;
  height: 23px;
  color: var(--ui-surface);
  background-color: var(--ui-primary);
  border: 2px solid var(--ui-ink);
  font-size: 6px;
  box-shadow:
    0 -3px rgba(0, 0, 0, 0.35) inset,
    0 3px rgba(255, 255, 255, 0.25) inset;
}

.game-monitor__buttons {
  display: flex;
  align-items: center;
  gap: 9px;
}

.game-monitor__speaker {
  width: 30px;
  height: 11px;
  background:
    repeating-linear-gradient(
      90deg,
      #756a49 0,
      #756a49 2px,
      transparent 2px,
      transparent 5px
    );
  opacity: 0.7;
}

.game-monitor__power-light {
  width: 7px;
  height: 7px;
  background-color: var(--ui-primary);
  border: 2px solid var(--ui-ink);
  box-shadow: 0 0 0 2px rgba(47, 168, 79, 0.15);
  animation: monitor-light 1.8s steps(2) infinite;
}

.game-monitor__power-light--error {
  background-color: #d83a3a;
  box-shadow: 0 0 0 2px rgba(216, 58, 58, 0.15);
}

.game-monitor__power {
  width: 18px;
  height: 13px;
  background-color: var(--ui-gold);
  border: 2px solid var(--ui-ink);
  box-shadow:
    0 -3px rgba(109, 85, 38, 0.5) inset,
    0 3px rgba(255, 255, 255, 0.35) inset,
    0 2px 0 rgba(0, 0, 0, 0.25);
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

@keyframes monitor-light {
  0%,
  70% {
    opacity: 1;
  }

  71%,
  100% {
    opacity: 0.35;
  }
}

/* Responsive */

@media (max-width: 920px) {
  .game-modal {
    padding: 14px;
  }

  .game-monitor {
    width: 100%;
  }

  .game-monitor__screen {
    height: auto;
  }

  .game-desktop--setup,
  .game-desktop--results {
    padding: 34px 22px 28px;
  }
}

@media (max-width: 760px) {
  .game-monitor {
    padding: 12px 12px 0;
  }

  .game-monitor__bezel {
    padding: 7px;
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

  .game-modal__setup-controls {
    flex-direction: column;
    width: min(100%, 360px);
  }

  .game-modal__name {
    width: 100%;
  }

  .game-monitor__hud {
    gap: 10px;
  }

  .game-monitor__stat--score {
    min-width: 105px;
  }

  .game-popup {
    width: 170px;
  }

  .game-modal__result-windows {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}


@media (max-width: 600px) {
  .game-modal {
    place-items: start center;
    padding: 6px;
  }

  .game-monitor {
    width: 100%;
    margin: 0;
    padding: 8px 8px 0;
    border-width: 3px;
  }

  .game-monitor__bezel {
    padding: 5px;
    border-width: 2px;
  }

  .game-monitor__screen {
    height: auto;
    border-width: 2px;
  }

  .game-desktop--setup,
  .game-desktop--results {
    padding: 24px 10px 20px;
  }

  .game-desktop--playing {
    padding-top: 88px;
  }

  .game-modal__header {
    width: 100%;
    margin-bottom: 22px;
    padding: 0;
  }

  .game-modal__title {
    justify-content: center;
    font-size: clamp(21px, 8vw, 32px);
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
    padding: 8px;
    font-size: 7px;
  }

  .game-modal__setup-controls {
    gap: 12px;
    margin-top: 18px;
  }

  .game-monitor__hud {
    top: 12px;
    left: 10px;
    grid-template-columns: 1fr auto 1fr;
    gap: 5px;
    width: calc(100% - 20px);
    min-height: 58px;
    padding: 5px 7px;
  }

  .game-monitor__stat {
    gap: 4px;
  }

  .game-monitor__stat-label {
    font-size: 6px;
  }

  .game-monitor__stat--time strong {
    font-size: 10px;
  }

  .game-monitor__stat--score {
    min-width: 74px;
    min-height: 42px;
    padding: 4px 7px;
  }

  .game-monitor__stat--score strong {
    font-size: 17px;
  }

  .game-modal__lives {
    gap: 2px;
    font-size: 10px;
  }

  .game-popup {
    width: 148px;
  }

  .game-popup__bar {
    min-height: 26px;
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

  .game-modal__leaderboard-title {
    margin-bottom: 17px;
    font-size: 20px;
  }

  .game-modal__result-windows {
    gap: 8px;
  }

  .xp-window__titlebar {
    gap: 5px;
    min-height: 30px;
    font-size: 7px;
  }

  .xp-window__icon,
  .xp-window__decoration {
    width: 18px;
    height: 18px;
    font-size: 5px;
  }

  .xp-window__body--stat {
    min-height: 50px;
    padding: 8px 4px;
  }

  .game-modal__stat-value {
    font-size: 14px;
  }

  .xp-window--leaderboard {
    margin-top: 14px;
  }

  .xp-window__body--scores {
    padding: 8px 6px;
  }

  .game-modal__scores {
    font-size: 8px;
  }

  .game-modal__scores li {
    grid-template-columns: 30px 1fr auto 36px;
    gap: 7px;
    padding: 9px 7px;
  }

  .game-modal__start--again {
    margin-top: 17px;
  }

  .game-monitor__controls {
    min-height: 38px;
    padding: 5px 7px 6px;
  }

  .game-monitor__brand {
    gap: 5px;
    font-size: 6px;
  }

  .game-monitor__brand-mark {
    width: 20px;
    height: 20px;
    font-size: 5px;
  }

  .game-monitor__speaker {
    display: none;
  }

  .game-monitor__power {
    width: 16px;
    height: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .popup-enter-active,
  .popup-leave-active,
  .game-popup {
    transition: none;
  }

  .game-monitor__power-light {
    animation: none;
  }
}
</style>