<script setup>
import { ref } from "vue"

import Navbar from "./Navbar.vue"
import Sidebar from "./Sidebar.vue"
import StatsSection from "./StatsSection.vue"
import WelcomeSection from "./WelcomeSection.vue"

const isConnected = ref(false)
</script>

<template>
  <main class="dashboard">
    <Sidebar />

    <section class="dashboard__content">
      <Navbar
        :is-connected="isConnected"
        @toggle-connection="isConnected = !isConnected"
      />

      <WelcomeSection id="overview" />

      <StatsSection
        :is-connected="isConnected"
      />

    </section>
  </main>
</template>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  min-height: 100dvh;
  color: var(--ui-ink);
  background:
    linear-gradient(color-mix(in srgb, var(--ui-background) 94%, transparent), color-mix(in srgb, var(--ui-background) 98%, transparent)),
    repeating-linear-gradient(0deg, transparent 0, transparent 31px, color-mix(in srgb, var(--ui-surface) 4%, transparent) 31px, color-mix(in srgb, var(--ui-surface) 4%, transparent) 32px),
    repeating-linear-gradient(90deg, transparent 0, transparent 31px, color-mix(in srgb, var(--ui-surface) 4%, transparent) 31px, color-mix(in srgb, var(--ui-surface) 4%, transparent) 32px);
}

.dashboard__content {
  display: flex;
  flex-direction: column;
  width: min(100%, 1100px);
  min-height: 100dvh;
  padding: 28px clamp(18px, 4vw, 56px) 0;
  margin: 0 auto;
  box-sizing: border-box;
}

@media (max-width: 760px) {
  .dashboard {
    display: block;
  }

  .dashboard__content {
    min-height: calc(100dvh - 60px);
    padding-top: 18px;
  }
}

</style>