<script setup>
import { computed, onMounted, onBeforeUnmount, reactive, ref } from "vue"

import {
  createInitialGame,
  createTargetPosition,
  loadLeaderboard,
  saveScore,
} from "@/assets/js/Game.js"

import Button from "@/components/ui/Button.vue"
import TextBox from "@/components/ui/TextBox.vue"

const emit = defineEmits(["close"])
const closeButton = ref(null)
const playerName = ref("")
const leaderboard = ref(loadLeaderboard())
const game = reactive(createInitialGame())
let timerId

const hasName = computed(() => playerName.value.trim().length > 0)

const stopGame = () => {
  window.clearInterval(timerId)
  timerId = undefined
  game.isPlaying = false
  game.isFinished = true
  leaderboard.value = saveScore(game.playerName, game.score)
}

const startGame = () => {
  if (!hasName.value) {
    return
  }

  window.clearInterval(timerId)
  Object.assign(game, createInitialGame(playerName.value.trim()), {
    isPlaying: true,
  })

  timerId = window.setInterval(() => {
    game.timeLeft -= 1

    if (game.timeLeft <= 0) {
      stopGame()
    }
  }, 1000)
}

const hitTarget = () => {
  if (!game.isPlaying) {
    return
  }

  game.score += 1
  game.target = createTargetPosition()
}

const handleKeydown = (event) => {
  if (event.key === "Escape") {
    emit("close")
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown)
  closeButton.value?.$el?.focus()
})

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown)
  window.clearInterval(timerId)
})
</script>

<template>
  <Teleport to="body">
    <div class="game-modal" role="presentation" @click.self="emit('close')">
      <section
        class="game-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Pixel Hunt"
      >
        <Button
          ref="closeButton"
          class="game-modal__close"
          type="button"
          aria-label="Close game"
          @click="emit('close')"
        >
          ×
        </Button>

        <div v-if="!game.isPlaying && !game.isFinished" class="game-modal__setup">
          <p class="game-modal__eyebrow">PIXEL HUNT</p>
          <TextBox
            v-model="playerName"
            class="game-modal__name"
            placeholder="Player name"
            aria-label="Player name"
            maxlength="16"
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

        <div v-else-if="game.isPlaying" class="game-modal__play">
          <p class="game-modal__eyebrow">PIXEL HUNT</p>
          <div class="game-modal__stats" aria-live="polite">
            <span>Score: {{ game.score }}</span>
            <span>Time: {{ game.timeLeft }}s</span>
          </div>

          <div class="game-board" aria-label="Pixel Hunt game area">
            <button
              class="game-board__target"
              type="button"
              aria-label="Hit pixel"
              :style="{
                left: `${game.target.x}%`,
                top: `${game.target.y}%`,
              }"
              @click="hitTarget"
            ></button>
          </div>
        </div>

        <div v-else class="game-modal__leaderboard">
          <h2 id="game-modal-title">Leaderboard</h2>
          <ol v-if="leaderboard.length" class="game-modal__scores">
            <li v-for="entry in leaderboard" :key="`${entry.name}-${entry.score}`">
              <span>{{ entry.name }}</span>
              <strong>{{ entry.score }}</strong>
            </li>
          </ol>
          <p v-else class="game-modal__message">No scores yet.</p>
          <Button class="game-modal__start" @click="startGame">
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
  background-color: rgba(21, 23, 17, 0.78);
}

.game-modal__panel {
  position: relative;
  width: min(100%, 560px);
  padding: 48px 32px 36px;
  color: var(--ui-ink);
  text-align: center;
  background-color: var(--ui-surface);
  border: 4px solid var(--ui-ink);
  box-shadow:
    0 -6px rgba(0, 0, 0, 0.3) inset,
    0 6px rgba(255, 255, 255, 0.65) inset,
    0 8px 0 rgba(0, 0, 0, 0.35);
}

.game-modal__close {
  position: absolute;
  z-index: 3;
  top: 12px;
  right: 12px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  padding: 0;
  color: var(--ui-white);
  background-color: #d83a3a;
  border: 2px solid var(--ui-ink);
  font-family: var(--ui-font-display);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
}

.game-modal__close:hover {
  background-color: #b72c2c;
}

.game-modal__close:focus-visible {
  outline: 3px solid var(--ui-focus);
  outline-offset: 3px;
}

.game-modal__eyebrow {
  margin: 0 0 16px;
  color: var(--ui-primary);
  font-family: var(--ui-font-label);
  font-size: 12px;
  letter-spacing: 2px;
}

.game-modal__panel h2 {
  margin: 0;
  font-family: var(--ui-font-display);
  font-size: clamp(20px, 4vw, 30px);
  line-height: 1.4;
  text-transform: uppercase;
}

.game-modal__message {
  margin: 20px auto 0;
  color: var(--ui-muted);
  font-size: 23px;
  line-height: 1.4;
}

.game-modal__name {
  display: block;
  max-width: 320px;
  margin: 24px auto 0;
}

.game-modal__name :deep(.ui-field__input) {
  text-align: center;
}

.game-modal__stats {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
  color: var(--ui-ink);
  font-family: var(--ui-font-label);
  font-size: 11px;
  text-transform: uppercase;
}

.game-board {
  position: relative;
  width: 100%;
  height: 220px;
  margin-top: 12px;
  overflow: hidden;
  background-color: var(--ui-surface-sunken);
  border: 3px solid var(--ui-ink);
  background-image:
    linear-gradient(rgba(109, 85, 38, 0.08) 2px, transparent 2px),
    linear-gradient(90deg, rgba(109, 85, 38, 0.08) 2px, transparent 2px);
  background-size: 24px 24px;
}

.game-board__target {
  position: absolute;
  width: 28px;
  height: 28px;
  padding: 0;
  background-color: var(--ui-gold);
  border: 3px solid var(--ui-ink);
  transform: translate(-50%, -50%);
  cursor: crosshair;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.3);
}

.game-board__target:active {
  transform: translate(-50%, -50%) translateY(3px);
  box-shadow: none;
}

.game-board__message {
  position: absolute;
  inset: 50% 0 auto;
  margin: 0;
  color: var(--ui-muted);
  font-family: var(--ui-font-label);
  font-size: 12px;
  text-transform: uppercase;
  transform: translateY(-50%);
}

.game-modal__start {
  display: block;
  min-height: 44px;
  margin-top: 18px;
  margin-right: auto;
  margin-left: auto;
  padding: 10px 18px;
  color: var(--ui-white);
  background-color: var(--ui-primary);
  border: 2px solid var(--ui-ink);
  font-family: var(--ui-font-display);
  font-size: 10px;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.3);
}

.game-modal__start:active {
  transform: translateY(3px);
  box-shadow: none;
}

.game-modal__start:focus-visible,
.game-board__target:focus-visible {
  outline: 3px solid var(--ui-focus);
  outline-offset: 3px;
}

.game-modal__leaderboard h2 {
  margin: 0;
  font-family: var(--ui-font-display);
  font-size: clamp(20px, 4vw, 30px);
  line-height: 1.4;
  text-transform: uppercase;
}

.game-modal__scores {
  max-width: 360px;
  margin: 24px auto 0;
  padding: 0;
  color: var(--ui-ink);
  font-family: var(--ui-font-label);
  font-size: 13px;
  list-style: none;
  text-align: left;
}

.game-modal__scores li {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 10px 12px;
  border-bottom: 2px dashed color-mix(in srgb, var(--ui-muted) 40%, transparent);
}

.game-modal__scores li:first-child {
  color: var(--ui-primary);
}

.game-modal__scores strong {
  color: var(--ui-ink);
}

@media (max-width: 600px) {
  .game-modal {
    padding: 16px;
  }

  .game-modal__panel {
    padding: 44px 18px 24px;
  }

  .game-board {
    height: 190px;
  }
}
</style>
