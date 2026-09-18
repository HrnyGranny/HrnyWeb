<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"

import profileImage from "@/assets/img/HrnyGranny_Pixel.png"
import Button from "@/components/ui/Button.vue"
import Game from "@/components/sections/Home/Game.vue"

const isScrolled = ref(false)
const isGameOpen = ref(false)

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

      <h1 class="home__title">
        HrnyGranny
      </h1>

      <p class="home__description">
        If you are already here, just play the game.
      </p>

      <Button class="home__play" @click="isGameOpen = true">
        Play
     </Button>
    </div>

    <a class="home__scroll" href="#projects">
      <span>Scroll to continue</span>
      <span class="home__scroll-arrow">▼</span>
    </a>

    <Game v-if="isGameOpen" @close="isGameOpen = false" />
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
  width: 388px;
  height: 388px;
  margin: 0 auto 18px;
  background: transparent;
  border: none;
  box-shadow: none;
  clip-path: none;
  perspective: 1200px;
}

.home__avatar {
  display: block;
  width: 388px;
  height: 388px;
  object-fit: contain;
  transform-origin: center;
  transform: rotateY(0deg) rotateX(2deg) translateY(0);
  animation: avatar-float 3s ease-in-out infinite;
  transition: filter 260ms ease;
  filter: drop-shadow(0 10px 0 rgba(0, 0, 0, 0.35));
}

@keyframes avatar-float {
  0%,
  100% {
    transform: rotateY(0deg) rotateX(2deg) translateY(0px);
  }

  50% {
    transform: rotateY(2deg) rotateX(2deg) translateY(-10px);
  }
}

.home__title {
  margin: 10px 0 0;
  color: var(--ui-surface);
  font-family: var(--ui-font-display);
  font-size: clamp(31px, 6.6vw, 64px);
  line-height: 1.3;
  text-shadow:
    4px 4px 0 var(--ui-primary),
    8px 8px 0 rgba(0, 0, 0, 0.4);
}

.home__description {
  max-width: 580px;
  margin: 26px auto;
  color: var(--ui-muted);
  font-size: 24px;
  line-height: 1.4;
}

.home__play :deep(.ui-btn) {
  min-width: 140px;
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
    width: 230px;
    height: 230px;
  }

  .home__avatar {
    width: 230px;
    height: 230px;
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
