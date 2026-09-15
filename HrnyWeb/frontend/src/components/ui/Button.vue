<script setup>
defineProps({
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    class="ui-btn"
    :type="type"
    :disabled="disabled || loading"
  >
    <span class="ui-btn__label">
      <slot>{{ loading ? "LOADING..." : "BUTTON" }}</slot>
    </span>
  </button>
</template>

<style scoped>
.ui-btn {
  --ui-btn-primary: #2fa84f;
  --ui-btn-primary-hi: rgba(100, 253, 31, 0.99);
  --ui-btn-primary-lo: rgba(21, 108, 0, 0.5);
  --ui-btn-ink: #1c1c1c;
  --ui-btn-text: #ffffff;

  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 14px 24px;
  color: var(--ui-btn-text);
  background-color: var(--ui-btn-primary);
  border: 0;
  border-radius: 0;
  outline: 2px solid var(--ui-btn-ink);
  outline-offset: 0;
  font-family: "Press Start 2P", "Courier New", monospace;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.25);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition:
    transform 120ms cubic-bezier(0, 0.8, 0.26, 0.99),
    background-color 120ms cubic-bezier(0, 0.8, 0.26, 0.99);
}

.ui-btn::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  content: "";
  pointer-events: none;
  background-color: var(--ui-btn-primary);
  box-shadow:
    0 -4px var(--ui-btn-primary-lo) inset,
    0 4px var(--ui-btn-primary-hi) inset,
    -4px 0 rgba(100, 253, 31, 0.5) inset,
    4px 0 rgba(21, 108, 0, 0.5) inset;
}

.ui-btn::after {
  position: absolute;
  inset: 0;
  content: "";
  pointer-events: none;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.3);
}

.ui-btn:hover:not(:disabled)::before {
  box-shadow:
    0 -4px rgba(0, 0, 0, 0.5) inset,
    0 4px rgba(255, 255, 255, 0.2) inset,
    -4px 0 rgba(255, 255, 255, 0.2) inset,
    4px 0 rgba(0, 0, 0, 0.5) inset;
}

.ui-btn:active:not(:disabled) {
  transform: translateY(4px);
}

.ui-btn:active:not(:disabled)::after {
  box-shadow: none;
}

.ui-btn:focus-visible {
  outline: 3px solid #3aa0e6;
  outline-offset: 4px;
}

.ui-btn:disabled {
  cursor: not-allowed;
  filter: grayscale(0.6);
  opacity: 0.6;
}

.ui-btn__label {
  position: relative;
  z-index: 2;
}
</style>