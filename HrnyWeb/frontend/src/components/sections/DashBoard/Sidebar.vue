<template>
  <aside class="dashboard__sidebar">
    <a class="dashboard__brand" href="/HrnyWeb/">
      <span class="dashboard__brand-mark">HG</span>
      <span>Dashboard</span>
    </a>

    <nav class="dashboard__menu" aria-label="Dashboard navigation">
      <a class="dashboard__menu-link dashboard__menu-link--active" href="#overview">
        <span aria-hidden="true">▣</span>
        Overview
      </a>
      <span class="dashboard__menu-label">Applications</span>
      <a class="dashboard__menu-link" href="#data">
        <span aria-hidden="true">▤</span>
        Data
      </a>
    </nav>

    <span class="dashboard__version">v0.1</span>
  </aside>
</template>

<style scoped>
.dashboard__sidebar {
  display: flex;
  flex-direction: column;
  gap: 42px;
  padding: 28px 18px;
  color: var(--ui-surface);
  background-color: color-mix(in srgb, var(--ui-background) 86%, var(--ui-primary));
  border-right: 2px solid var(--ui-ink);
}

.dashboard__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: inherit;
  font-family: var(--ui-font-display);
  font-size: 11px;
  text-decoration: none;
}

.dashboard__brand-mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  color: var(--ui-white);
  background: var(--ui-primary);
  border: 2px solid var(--ui-surface);
  font-size: 8px;
}

.dashboard__menu {
  display: grid;
  gap: 10px;
}

.dashboard__menu-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 10px;
  color: var(--ui-muted);
  font-family: var(--ui-font-label);
  font-size: 10px;
  text-decoration: none;
  text-transform: uppercase;
}

.dashboard__menu-label {
  margin-top: 12px;
  color: var(--ui-footer-muted);
  font-family: var(--ui-font-label);
  font-size: 8px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.dashboard__menu-link:hover,
.dashboard__menu-link--active {
  color: var(--ui-ink);
  background: var(--ui-gold);
}

.dashboard__version {
  width: 100%;
  margin-top: auto;
  color: var(--ui-footer-muted);
  font-family: var(--ui-font-label);
  font-size: 9px;
  text-align: center;
}

@media (max-width: 760px) {
  .dashboard__sidebar {
    flex-direction: row;
    align-items: center;
    gap: 18px;
    padding: 12px 16px;
    border-right: 0;
    border-bottom: 2px solid var(--ui-ink);
  }

  .dashboard__menu {
    display: flex;
    gap: 2px;
    margin-left: auto;
  }

  .dashboard__menu-link {
    padding: 8px;
    font-size: 8px;
  }

  .dashboard__menu-link span,
  .dashboard__menu-label,
  .dashboard__version {
    display: none;
  }
}

@media (max-width: 500px) {
  .dashboard__brand span:last-child {
    display: none;
  }
}
</style>