<script setup>
defineProps({
  title: {
    type: String,
    default: "Windows XP",
  },
})
</script>

<template>
  <div class="xp-window">
    <div class="xp-window__bar">
      <span class="xp-window__title">
        {{ title }}
      </span>

      <span
        class="xp-window__controls"
        aria-hidden="true"
      >
        <span></span>
        <span></span>
        <span></span>
      </span>
    </div>

    <div class="xp-window__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.xp-window {
  width: min(100%, 680px);
  overflow: hidden;
  background-color: rgba(223, 228, 223, 0.92);
  border: 2px solid var(--ui-ink);
  box-shadow:
    0 -4px rgba(0, 0, 0, 0.2) inset,
    0 4px rgba(255, 255, 255, 0.75) inset,
    -4px 0 rgba(255, 255, 255, 0.2) inset,
    4px 0 rgba(0, 0, 0, 0.2) inset,
    0 6px 0 rgba(0, 0, 0, 0.22);
}

.xp-window__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 10px 8px 12px;
  color: #ffffff;
  background: linear-gradient(180deg, #0a57d3 0%, #0d4db8 100%);
  border-bottom: 2px solid var(--ui-ink);
  font-family: "Silkscreen", monospace;
  font-size: 8px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.xp-window__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.xp-window__controls {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 62px;
  gap: 8px;
  color: #d2e3ff;
  font-family: "Press Start 2P", monospace;
  font-size: 9px;
  line-height: 1;
}

.xp-window__controls span {
  display: inline-grid;
  place-items: center;
  width: 14px;
  height: 14px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.08);
}

.xp-window__controls span::before {
  display: block;
  content: "";
}

.xp-window__controls span:first-child::before {
  width: 8px;
  height: 2px;
  background-color: currentColor;
}

.xp-window__controls span:nth-child(2)::before {
  width: 7px;
  height: 7px;
  border: 1px solid currentColor;
}

.xp-window__controls span:last-child::before {
  width: 9px;
  height: 9px;
  content: "×";
  font-size: 13px;
  line-height: 8px;
  text-align: center;
}

.xp-window__body {
  width: 100%;
  color: var(--ui-ink);
  background-color: #dfe4df;
}
</style>
