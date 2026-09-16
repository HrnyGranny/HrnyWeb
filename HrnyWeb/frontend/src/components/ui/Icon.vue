<script setup>
defineProps({
  icon: {
    type: String,
    default: "?",
  },
  title: {
    type: String,
    default: "Hint",
  },
  text: {
    type: String,
    default: "",
  },
  ariaLabel: {
    type: String,
    default: "Show information",
  },
})
</script>

<template>
  <span class="ui-tooltip">
    <button
      class="ui-tooltip__trigger"
      type="button"
      :aria-label="ariaLabel"
    >
      <slot name="icon">{{ icon }}</slot>
    </button>

    <span
      v-if="title || text || $slots.default"
      class="ui-tooltip__bubble"
      role="tooltip"
    >
      <span v-if="title" class="ui-tooltip__title">
        {{ title }}
      </span>

      <slot>{{ text }}</slot>
    </span>
  </span>
</template>

<style scoped>
.ui-tooltip {
  position: relative;
  display: inline-flex;
  font-family: var(--ui-font-body);
}

.ui-tooltip__trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  color: var(--ui-ink);
  background-color: var(--ui-gold);
  border: 2px solid var(--ui-ink);
  border-radius: 0;
  font-family: var(--ui-font-display);
  font-size: 14px;
  cursor: pointer;
  box-shadow:
    0 -4px rgba(138, 85, 16, 0.55) inset,
    0 4px rgba(255, 210, 122, 0.95) inset,
    -4px 0 rgba(255, 210, 122, 0.55) inset,
    4px 0 rgba(138, 85, 16, 0.55) inset,
    0 4px 0 rgba(0, 0, 0, 0.25);
  transition: transform 120ms cubic-bezier(0, 0.8, 0.26, 0.99);
}

.ui-tooltip__trigger:hover {
  transform: translateY(-1px);
}

.ui-tooltip__trigger:focus-visible {
  outline: 3px solid var(--ui-focus);
  outline-offset: 3px;
}

.ui-tooltip__bubble {
  position: absolute;
  z-index: 10;
  bottom: calc(100% + 14px);
  left: 50%;
  min-width: 200px;
  padding: 10px 12px;
  box-sizing: border-box;
  color: var(--ui-ink);
  background-color: var(--ui-surface);
  border: 2px solid var(--ui-ink);
  font-size: 18px;
  line-height: 1.25;
  text-align: left;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%) translateY(4px);
  box-shadow:
    0 -4px rgba(0, 0, 0, 0.35) inset,
    0 4px rgba(255, 255, 255, 0.75) inset,
    -4px 0 rgba(255, 255, 255, 0.35) inset,
    4px 0 rgba(0, 0, 0, 0.35) inset,
    0 6px 0 rgba(0, 0, 0, 0.3);
  transition:
    opacity 140ms cubic-bezier(0, 0.8, 0.26, 0.99),
    transform 140ms cubic-bezier(0, 0.8, 0.26, 0.99);
}

.ui-tooltip__bubble::before,
.ui-tooltip__bubble::after {
  position: absolute;
  left: 50%;
  width: 0;
  height: 0;
  content: "";
  transform: translateX(-50%);
}

.ui-tooltip__bubble::before {
  bottom: -10px;
  border-top: 10px solid var(--ui-ink);
  border-right: 8px solid transparent;
  border-left: 8px solid transparent;
}

.ui-tooltip__bubble::after {
  bottom: -6px;
  border-top: 8px solid var(--ui-surface);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
}

.ui-tooltip__title {
  display: block;
  margin-bottom: 4px;
  color: var(--ui-muted);
  font-family: var(--ui-font-label);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.ui-tooltip:hover .ui-tooltip__bubble,
.ui-tooltip:focus-within .ui-tooltip__bubble {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}
</style>