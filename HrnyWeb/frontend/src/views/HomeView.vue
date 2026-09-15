<script setup>
import About from "@/components/sections/About/About.vue"
import Home from "@/components/sections/Home/Home.vue"
import Projects from "@/components/sections/Projects/Projects.vue"
import Footer from "@/components/Footer.vue"
import NavBar from "@/components/NavBar.vue"
import SecretAccess from "@/components/SecretAccess.vue"
</script>

<template>
  <main class="home">
    <NavBar />

    <Home />

    <Projects />

    <About />

    <Footer />

    <SecretAccess />
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--ui-ink);
  background:
    linear-gradient(color-mix(in srgb, var(--ui-background) 94%, transparent), color-mix(in srgb, var(--ui-background) 98%, transparent)),
    repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 31px,
      color-mix(in srgb, var(--ui-surface) 4%, transparent) 31px,
      color-mix(in srgb, var(--ui-surface) 4%, transparent) 32px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0,
      transparent 31px,
      color-mix(in srgb, var(--ui-surface) 4%, transparent) 31px,
      color-mix(in srgb, var(--ui-surface) 4%, transparent) 32px
    );
}
</style>