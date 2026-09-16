<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"

import profileImage from "@/assets/img/HrnyGranny.png"

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 180
}

onMounted(() => {
  handleScroll()
  window.addEventListener("scroll", handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<template>
  <section
    id="home"
    class="home__hero"
    :class="{ 'home__hero--scrolled': isScrolled }"
  >
    <div class="home__hero-content">
      <div class="home__avatar-frame">
        <img
          class="home__avatar"
          :src="profileImage"
          alt="HrnyGranny profile icon"
        />
      </div>

      <p class="home__eyebrow">
        PLAYER PROFILE
      </p>

      <h1 class="home__title">
        HrnyGranny
      </h1>

      <p class="home__description">
        Developer building things one pixel at a time.
      </p>

      <a
        class="home__github"
        href="https://github.com/TU-USUARIO"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="home__github-icon">
          &lt;/&gt;
        </span>

        <span>Visit GitHub</span>
      </a>
    </div>

    <a class="home__scroll" href="#projects">
      <span>Scroll to continue</span>
      <span class="home__scroll-arrow">▼</span>
    </a>
  </section>
</template>

<style scoped>
.home__hero {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 80px 24px;
  text-align: center;
}

.home__hero-content {
  transition:
    opacity 300ms ease,
    filter 300ms ease,
    transform 300ms ease;
}

.home__hero--scrolled .home__hero-content {
  opacity: 0.25;
  filter: blur(2px);
  transform: scale(0.88);
}

.home__avatar-frame {
  display: grid;
  place-items: center;
  width: 156px;
  height: 156px;
  margin: 0 auto 24px;
  background-color: var(--ui-surface);
  border: 4px solid var(--ui-ink);
  clip-path: polygon(
    14px 0,
    calc(100% - 14px) 0,
    100% 14px,
    100% calc(100% - 14px),
    calc(100% - 14px) 100%,
    14px 100%,
    0 calc(100% - 14px),
    0 14px
  );
  box-shadow:
    0 -6px rgba(0, 0, 0, 0.35) inset,
    0 6px rgba(255, 255, 255, 0.65) inset,
    0 10px 0 rgba(0, 0, 0, 0.35);
}

.home__avatar {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.home__eyebrow {
  margin: 0 0 18px;
  color: var(--ui-gold);
  font-family: var(--ui-font-label);
  font-size: 12px;
  letter-spacing: 2px;
}

.home__title {
  margin: 0;
  color: var(--ui-surface);
  font-family: var(--ui-font-display);
  font-size: clamp(28px, 6vw, 58px);
  line-height: 1.3;
  text-shadow:
    4px 4px 0 var(--ui-primary),
    8px 8px 0 rgba(0, 0, 0, 0.4);
}

.home__description {
  max-width: 520px;
  margin: 26px auto;
  color: var(--ui-muted);
  font-size: 24px;
  line-height: 1.4;
}

.home__github {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  color: var(--ui-ink);
  background-color: var(--ui-gold);
  border: 2px solid var(--ui-ink);
  font-family: var(--ui-font-label);
  font-size: 12px;
  text-decoration: none;
  text-transform: uppercase;
  box-shadow:
    0 -4px rgba(138, 85, 16, 0.55) inset,
    0 4px rgba(255, 210, 122, 0.95) inset,
    0 5px 0 rgba(0, 0, 0, 0.35);
  transition: transform 120ms ease;
}

.home__github:hover {
  transform: translateY(-2px);
}

.home__github:active {
  transform: translateY(3px);
  box-shadow:
    0 -4px rgba(138, 85, 16, 0.55) inset,
    0 4px rgba(255, 210, 122, 0.95) inset;
}

.home__github-icon {
  font-family: var(--ui-font-display);
  font-size: 10px;
}

.home__scroll {
  position: absolute;
  bottom: 30px;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--ui-muted);
  font-family: var(--ui-font-label);
  font-size: 10px;
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
  transform: translateX(-50%);
}

.home__scroll-arrow {
  color: var(--ui-primary);
  animation: scroll-arrow 1.1s steps(2) infinite;
}

@keyframes scroll-arrow {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(7px);
  }

  100% {
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .home__hero {
    padding-inline: 18px;
  }

  .home__avatar-frame {
    width: 132px;
    height: 132px;
  }

  .home__avatar {
    width: 100px;
    height: 100px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home__scroll-arrow {
    animation: none;
  }

  .home__hero-content,
  .home__hero {
    transition: none;
  }
}
</style>
