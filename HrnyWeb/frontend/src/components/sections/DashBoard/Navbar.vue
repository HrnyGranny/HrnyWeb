<script setup>
import Button from "@/components/ui/Button.vue"

defineProps({
  isConnected: {
    type: Boolean,
    default: false,
  },
})

defineEmits(["toggle-connection"])
</script>

<template>
  <header class="dashboard__navbar">
    <div>
      <span class="dashboard__eyebrow">PLAYER ZONE</span>
      <h1>Control room</h1>
    </div>

    <Button
      class="dashboard__connect"
      @click="$emit('toggle-connection')"
    >
      <span
        class="dashboard__status-dot"
        :class="{ 'dashboard__status-dot--online': isConnected }"
        aria-hidden="true"
      ></span>
      {{ isConnected ? "Connected" : "Connect server" }}
    </Button>
  </header>
</template>

<style scoped>
.dashboard__navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 28px;
  border-bottom: 2px solid color-mix(in srgb, var(--ui-muted) 45%, transparent);
}

.dashboard__eyebrow {
  color: var(--ui-primary);
  font-family: var(--ui-font-label);
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

h1 {
  margin: 8px 0 0;
  color: var(--ui-surface);
  font-family: var(--ui-font-display);
  font-size: clamp(18px, 3vw, 28px);
  line-height: 1.4;
}

.dashboard__connect :deep(.ui-btn) {
  min-height: 42px;
  padding: 10px 14px;
  font-size: 9px;
}

.dashboard__status-dot {
  width: 8px;
  height: 8px;
  margin-right: 8px;
  background: var(--ui-gold);
  border: 1px solid var(--ui-ink);
}

.dashboard__status-dot--online {
  background: #9eff68;
}

@media (max-width: 500px) {
  .dashboard__navbar {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>