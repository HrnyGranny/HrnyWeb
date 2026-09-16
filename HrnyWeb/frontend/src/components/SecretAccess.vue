<script setup>
import { nextTick, ref } from "vue"

import Icon from "@/components/ui/Icon.vue"
import TextBox from "@/components/ui/TextBox.vue"

const isOpen = ref(false)
const password = ref("")
const passwordField = ref(null)

const toggleAccess = async () => {
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    await nextTick()

    const input = passwordField.value?.$el?.querySelector("input")
    input?.focus()
  }
}
</script>

<template>
  <aside
    class="secret-access"
    :class="{ 'secret-access--open': isOpen }"
  >
    <Transition name="secret-input">
      <div
        v-if="isOpen"
        id="secret-panel"
        class="secret-access__field"
      >
        <TextBox
          ref="passwordField"
          v-model="password"
          type="password"
          placeholder="Enter password..."
          autocomplete="off"
          aria-label="Secret access password"
          @keydown.esc="toggleAccess"
        />
      </div>
    </Transition>

    <div class="secret-access__trigger">
      <Icon
        title="Secret access"
        :text="
          isOpen
            ? 'Close treasure password.'
            : 'Open treasure password.'
        "
        aria-label="Toggle secret access"
        :aria-expanded="isOpen"
        aria-controls="secret-panel"
        @click="toggleAccess"
      >
        <template #icon>
          <svg
            class="secret-access__key"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M21 10h-6.18C14.4 7.72 12.39 6 10 6c-2.76 0-5 2.24-5 5s2.24 5 5 5c2.39 0 4.4-1.72 4.82-4H17v2h2v-2h2v-2Zm-11 4c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3Z"
            />
          </svg>
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
  align-items: flex-start;
  height: 56px;
}

/* Campo de contraseña */

.secret-access__field {
  position: relative;
  z-index: 1;
  width: min(260px, calc(100vw - 106px));
  height: 52px;
  margin-right: 10px;
}

/* Sombra exterior del TextBox */

.secret-access__field::after {
  position: absolute;
  z-index: -1;
  inset: 0;
  content: "";
  pointer-events: none;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.3);
}

.secret-access__field :deep(.ui-field) {
  display: block;
  width: 100%;
  max-width: none;
  height: 52px;
}

.secret-access__field :deep(.ui-field__input) {
  width: 100%;
  height: 52px;
  min-height: 52px;
  padding: 10px 18px;
  color: var(--ui-ink);
  background-color: var(--ui-surface-sunken);
  border: 0;
  border-radius: 0;
  outline: 2px solid var(--ui-ink);
  outline-offset: 0;
  font-size: 21px;
  box-shadow:
    0 -4px rgba(109, 85, 38, 0.5) inset,
    0 4px rgba(255, 255, 255, 0.55) inset,
    -4px 0 rgba(255, 255, 255, 0.25) inset,
    4px 0 rgba(109, 85, 38, 0.4) inset;
  transition:
    background-color 120ms cubic-bezier(0, 0.8, 0.26, 0.99),
    box-shadow 120ms cubic-bezier(0, 0.8, 0.26, 0.99);
}

.secret-access__field :deep(.ui-field__input:hover),
.secret-access__field :deep(.ui-field__input:focus),
.secret-access__field :deep(.ui-field__input:focus-visible) {
  background-color: var(--ui-surface);
  outline: 2px solid var(--ui-ink);
  outline-offset: 0;
  box-shadow:
    0 -4px rgba(0, 0, 0, 0.5) inset,
    0 4px rgba(255, 255, 255, 0.2) inset,
    -4px 0 rgba(255, 255, 255, 0.2) inset,
    4px 0 rgba(0, 0, 0, 0.5) inset;
}

.secret-access__field
  :deep(.ui-field__input::placeholder) {
  color: var(--ui-muted);
  opacity: 0.7;
}

/* Contenedor del icono */

.secret-access__trigger {
  position: relative;
  z-index: 2;
  display: inline-flex;
  flex: 0 0 52px;
  width: 52px;
  height: 52px;
}

/* Botón cuadrado de la llave */

.secret-access__trigger
  :deep(.ui-tooltip__trigger) {
  position: relative;
  z-index: 1;
  width: 52px;
  height: 52px;
  padding: 0;
  color: var(--ui-ink);
  background-color: var(--ui-gold);
  border: 0;
  border-radius: 0;
  outline: 2px solid var(--ui-ink);
  outline-offset: 0;
  box-shadow: none;
  transform: translateY(0);
  transition:
    transform 120ms cubic-bezier(0, 0.8, 0.26, 0.99),
    background-color 120ms cubic-bezier(0, 0.8, 0.26, 0.99);
}

/* Relieve interior igual que Button.vue */

.secret-access__trigger
  :deep(.ui-tooltip__trigger::before) {
  position: absolute;
  z-index: -1;
  inset: 0;
  content: "";
  pointer-events: none;
  background-color: var(--ui-gold);
  box-shadow:
    0 -4px var(--ui-gold-lo) inset,
    0 4px var(--ui-gold-hi) inset,
    -4px 0 var(--ui-gold-hi) inset,
    4px 0 var(--ui-gold-lo) inset;
}

/* Sombra inferior igual que Button.vue */

.secret-access__trigger
  :deep(.ui-tooltip__trigger::after) {
  position: absolute;
  inset: 0;
  content: "";
  pointer-events: none;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.3);
}

/* Hover igual que Button.vue */

.secret-access__trigger
  :deep(.ui-tooltip__trigger:hover::before) {
  box-shadow:
    0 -4px rgba(0, 0, 0, 0.5) inset,
    0 4px rgba(255, 255, 255, 0.2) inset,
    -4px 0 rgba(255, 255, 255, 0.2) inset,
    4px 0 rgba(0, 0, 0, 0.5) inset;
}

/* Pulsación igual que Button.vue */

.secret-access__trigger
  :deep(.ui-tooltip__trigger:active) {
  transform: translateY(4px);
}

.secret-access__trigger
  :deep(.ui-tooltip__trigger:active::after) {
  box-shadow: none;
}

/* Foco del icono */

.secret-access__trigger
  :deep(.ui-tooltip__trigger:focus-visible) {
  outline: 3px solid var(--ui-focus);
  outline-offset: 4px;
}

/* Llave pixelada sin marco exterior */

.secret-access__key {
  position: relative;
  z-index: 2;
  display: block;
  flex: 0 0 30px;
  color: var(--ui-ink);
  text-shadow: 0 2px 0 rgba(255, 255, 255, 0.25);
  transform: rotate(90deg);
  transform-origin: center;
  transition: transform 180ms steps(3);
}

.secret-access--open .secret-access__key {
  transform: rotate(0deg);
}

/* Tooltip */

.secret-access__trigger
  :deep(.ui-tooltip__bubble) {
  right: 0;
  left: auto;
  transform: translateY(4px);
}

.secret-access__trigger
  :deep(.ui-tooltip__bubble::before),
.secret-access__trigger
  :deep(.ui-tooltip__bubble::after) {
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

/* Animación de apertura hacia la izquierda */

.secret-input-enter-active,
.secret-input-leave-active {
  overflow: hidden;
  transform-origin: right center;
  transition:
    width 220ms steps(5),
    margin-right 220ms steps(5),
    opacity 120ms linear;
}

.secret-input-enter-from,
.secret-input-leave-to {
  width: 0;
  margin-right: 0;
  opacity: 0;
}

.secret-input-enter-to,
.secret-input-leave-from {
  width: min(260px, calc(100vw - 106px));
  margin-right: 10px;
  opacity: 1;
}

/* Responsive */

@media (max-width: 600px) {
  .secret-access {
    right: 16px;
    bottom: 16px;
  }

  .secret-access__field,
  .secret-input-enter-to,
  .secret-input-leave-from {
    width: min(220px, calc(100vw - 98px));
  }
}

/* Movimientos reducidos */

@media (prefers-reduced-motion: reduce) {
  .secret-input-enter-active,
  .secret-input-leave-active,
  .secret-access__key,
  .secret-access__trigger
    :deep(.ui-tooltip__trigger) {
    transition: none;
  }
}
</style>