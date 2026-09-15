<script setup>
import { ref } from "vue"

import Icon from "@/components/ui/Icon.vue"
import TextBox from "@/components/ui/TextBox.vue"
import Button from "@/components/ui/Button.vue"

const isOpen = ref(false)
const password = ref("")

const toggleAccess = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <aside class="secret-access">
    <Transition name="secret-panel">
      <div
        v-if="isOpen"
        id="secret-panel"
        class="secret-access__panel"
      >
        <div class="secret-access__header">
          <span class="secret-access__status"></span>
          <span>Secret access</span>
        </div>

        <p class="secret-access__message">
          Enter the access key to continue.
        </p>

        <TextBox
          v-model="password"
          label="Password"
          type="password"
          placeholder="Enter password..."
          autocomplete="off"
        />

        <Button disabled>
          Unlock
        </Button>
      </div>
    </Transition>

    <div
      class="secret-access__trigger"
      @click="toggleAccess"
    >
      <Icon
        icon="K"
        title="Secret access"
        text="Open the password terminal."
        aria-label="Open secret access"
        :aria-expanded="isOpen"
        aria-controls="secret-panel"
      >
        <template #icon>
          <span class="secret-access__key">⚿</span>
        </template>
      </Icon>
    </div>
  </aside>
</template>

<style scoped>
.secret-access {
  position: fixed;
  z-index: 100;
  right: 24px;
  bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
}

.secret-access__trigger {
  display: inline-flex;
}

.secret-access__trigger :deep(.ui-tooltip__trigger) {
  width: 52px;
  height: 52px;
}

.secret-access__trigger :deep(.ui-tooltip__bubble) {
  right: 0;
  left: auto;
  transform: translateY(4px);
}

.secret-access__trigger :deep(.ui-tooltip__bubble::before),
.secret-access__trigger :deep(.ui-tooltip__bubble::after) {
  right: 16px;
  left: auto;
  transform: none;
}

.secret-access__trigger
  :deep(.ui-tooltip:hover .ui-tooltip__bubble),
.secret-access__trigger
  :deep(.ui-tooltip:focus-within .ui-tooltip__bubble) {
  transform: translateY(0);
}

.secret-access__key {
  font-family: "Press Start 2P", monospace;
  font-size: 22px;
  line-height: 1;
}

.secret-access__panel {
  width: min(300px, calc(100vw - 32px));
  padding: 18px;
  background-color: var(--ui-surface);
  border: 2px solid var(--ui-ink);
  box-shadow:
    0 -4px rgba(0, 0, 0, 0.35) inset,
    0 4px rgba(255, 255, 255, 0.75) inset,
    -4px 0 rgba(255, 255, 255, 0.35) inset,
    4px 0 rgba(0, 0, 0, 0.35) inset,
    0 7px 0 rgba(0, 0, 0, 0.35);
}

.secret-access__header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  color: var(--ui-ink);
  border-bottom: 2px dashed var(--ui-muted);
  font-family: "Press Start 2P", monospace;
  font-size: 10px;
  line-height: 1.4;
  text-transform: uppercase;
}

.secret-access__status {
  width: 10px;
  height: 10px;
  background-color: var(--ui-primary);
  border: 2px solid var(--ui-ink);
  animation: secret-blink 1.2s steps(2) infinite;
}

.secret-access__message {
  margin: 16px 0;
  color: var(--ui-muted);
  font-size: 19px;
  line-height: 1.3;
}

.secret-access__panel :deep(.ui-field) {
  max-width: none;
}

.secret-access__panel :deep(.ui-btn) {
  width: 100%;
  margin-top: 16px;
}

.secret-panel-enter-active,
.secret-panel-leave-active {
  transition:
    opacity 160ms ease,
    transform 160ms steps(3);
}

.secret-panel-enter-from,
.secret-panel-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}

@keyframes secret-blink {
  0%,
  50% {
    background-color: var(--ui-primary);
  }

  51%,
  100% {
    background-color: var(--ui-gold);
  }
}

@media (max-width: 600px) {
  .secret-access {
    right: 16px;
    bottom: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .secret-access__status {
    animation: none;
  }

  .secret-panel-enter-active,
  .secret-panel-leave-active {
    transition: none;
  }
}
</style>
