<script setup>
const currentYear = new Date().getFullYear()
const githubUrl = "https://github.com/hrnygranny"
</script>

<template>
  <footer class="home__footer">
    <span>
      © {{ currentYear }}
      <a
        class="home__footer-link"
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        HrnyGranny
      </a>
    </span>

    <span>v1.0.0</span>
  </footer>
</template>

<style scoped>
.home__footer {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: min(calc(100% - 40px), 1000px);
  margin: 0 auto;
  padding: 28px 0;
  color: var(--ui-footer-muted);
  font-family: var(--ui-font-label);
  font-size: 10px;
  text-transform: uppercase;
}

.home__footer-link {
  color: inherit;
  text-decoration: none;
  transition: color 120ms ease;
}

.home__footer-link:hover {
  color: var(--ui-gold);
}

.home__footer-link:focus-visible {
  color: var(--ui-gold);
  outline: 2px dashed var(--ui-gold);
  outline-offset: 4px;
}

@media (max-width: 600px) {
  .home__footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>