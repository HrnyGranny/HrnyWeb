<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"

import Button from "@/components/ui/Button.vue"
import Card from "@/components/ui/Card.vue"

const router = useRouter()

const goHome = () => {
  router.push("/HrnyWeb/")
}

onMounted(() => {
  const isDarkMode = localStorage.getItem("theme") === "dark"

  document.documentElement.dataset.theme = isDarkMode
    ? "dark"
    : "light"
})
</script>

<template>
  <main class="not-found">
    <Card class="not-found__card">
      <div class="not-found__content">
        <p class="not-found__code">
          404
        </p>

        <h1 class="not-found__title">
          Page not found
        </h1>

        <p class="not-found__message">
          The page you are looking for does not exist.
        </p>

        <Button
          class="not-found__button"
          type="button"
          @click="goHome"
        >
          Back home
        </Button>
      </div>
    </Card>
  </main>
</template>

<style scoped>
.not-found {
  position: relative;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 32px 20px;
  overflow: hidden;
  color: var(--ui-ink);
  background-color: var(--ui-surface-sunken);
}

/* Cuadrícula pixel art muy suave */

.not-found::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: "";
  background-image:
    linear-gradient(
      color-mix(in srgb, var(--ui-ink) 5%, transparent) 2px,
      transparent 2px
    ),
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--ui-ink) 5%, transparent) 2px,
      transparent 2px
    );
  background-size: 28px 28px;
}

/* Elementos decorativos */

.not-found::after {
  position: absolute;
  top: 12%;
  left: 8%;
  width: 18px;
  height: 18px;
  pointer-events: none;
  content: "";
  color: var(--ui-primary);
  background-color: currentColor;
  box-shadow:
    calc(84vw - 36px) 4vh 0 var(--ui-gold),
    8vw 68vh 0 var(--ui-gold),
    calc(78vw - 36px) 72vh 0 var(--ui-primary);
  transform: rotate(45deg);
  opacity: 0.55;
}

.not-found__card {
  position: relative;
  z-index: 1;
  width: min(100%, 480px);
  max-width: 480px;
  padding: 36px;
  text-align: center;
}

.not-found__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.not-found__code {
  margin: 0;
  color: var(--ui-primary);
  font-family: var(
    --ui-font-display,
    "Press Start 2P",
    monospace
  );
  font-size: clamp(58px, 12vw, 96px);
  line-height: 1;
  letter-spacing: 4px;
  text-shadow:
    4px 4px 0 #176b2d,
    8px 8px 0 rgba(0, 0, 0, 0.18);
}

.not-found__title {
  margin: 30px 0 0;
  color: var(--ui-ink);
  font-family: var(
    --ui-font-display,
    "Press Start 2P",
    monospace
  );
  font-size: clamp(15px, 3vw, 21px);
  line-height: 1.6;
  text-transform: uppercase;
}

.not-found__message {
  max-width: 340px;
  margin: 18px 0 0;
  color: var(--ui-muted);
  font-family: var(
    --ui-font-body,
    "VT323",
    monospace
  );
  font-size: 21px;
  line-height: 1.35;
}

.not-found__button {
  display: flex;
  margin: 28px auto 0;
}

@media (max-width: 600px) {
  .not-found {
    padding: 20px 14px;
  }

  .not-found__card {
    padding: 28px 20px;
  }

  .not-found__code {
    font-size: clamp(54px, 20vw, 78px);
    text-shadow:
      3px 3px 0 #176b2d,
      6px 6px 0 rgba(0, 0, 0, 0.18);
  }

  .not-found__title {
    margin-top: 26px;
    font-size: 14px;
  }

  .not-found__message {
    font-size: 19px;
  }

  .not-found__button {
    margin-top: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .not-found::after {
    transform: none;
  }
}
</style>