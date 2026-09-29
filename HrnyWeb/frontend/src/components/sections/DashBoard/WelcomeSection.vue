<template>
  <section class="dashboard__intro">
    <p>Welcome back, player.</p>
    <span>Here is your current world status.</span>
  </section>
</template>

<style scoped>
.dashboard__intro {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 18px;
  padding: 34px 0 20px;
}

.dashboard__intro p {
  margin: 0;
  color: var(--ui-surface);
  font-size: 25px;
}

.dashboard__intro span {
  color: var(--ui-muted);
  font-size: 18px;
}

@media (max-width: 500px) {
  .dashboard__intro {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>