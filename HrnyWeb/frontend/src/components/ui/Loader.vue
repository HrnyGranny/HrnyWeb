<script setup>
import { computed } from "vue"

const props = defineProps({
  label: {
    type: String,
    default: "Loading",
  },
  progress: {
    type: Number,
    default: 0,
  },
  cells: {
    type: Number,
    default: 12,
  },
})

const normalizedProgress = computed(() => {
  return Math.min(100, Math.max(0, props.progress))
})

const activeCells = computed(() => {
  return Math.round((normalizedProgress.value / 100) * props.cells)
})
</script>

<template>
  <div
    class="ui-loader"
    role="progressbar"
    :aria-label="label"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="normalizedProgress"
  >
    <div class="ui-loader__head">
      <span>{{ label }}</span>
      <span>{{ normalizedProgress }}%</span>
    </div>

    <div class="ui-loader__track">
      <div
        class="ui-loader__cells"
        :style="{ '--ui-loader-cells': cells }"
      >
        <span
          v-for="cell in cells"
          :key="cell"
          class="ui-loader__cell"
          :class="{ 'ui-loader__cell--active': cell <= activeCells }"
        ></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-loader {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 280px;
  color: var(--ui-ink);
  font-family: var(--ui-font-label);
}

.ui-loader__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--ui-muted);
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.ui-loader__track {
  position: relative;
  display: flex;
  padding: 6px;
  overflow: hidden;
  background-color: var(--ui-surface-sunken);
  border: 2px solid var(--ui-ink);
  box-shadow:
    0 4px rgba(0, 0, 0, 0.4) inset,
    0 -4px rgba(255, 255, 255, 0.55) inset,
    4px 0 rgba(0, 0, 0, 0.25) inset,
    -4px 0 rgba(255, 255, 255, 0.25) inset;
}

.ui-loader__track::after {
  position: absolute;
  inset: 0;
  content: "";
  pointer-events: none;
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.08) 0,
    rgba(0, 0, 0, 0.08) 1px,
    transparent 1px,
    transparent 3px
  );
}

.ui-loader__cells {
  display: grid;
  grid-template-columns: repeat(var(--ui-loader-cells), 1fr);
  gap: 3px;
  flex: 1;
  min-height: 20px;
}

.ui-loader__cell {
  background-color: rgba(28, 28, 28, 0.08);
  box-shadow: inset 0 -2px rgba(0, 0, 0, 0.15);
}

.ui-loader__cell--active {
  background-color: var(--ui-primary);
  box-shadow:
    inset 0 2px var(--ui-primary-hi),
    inset 0 -2px var(--ui-primary-lo);
}
</style>