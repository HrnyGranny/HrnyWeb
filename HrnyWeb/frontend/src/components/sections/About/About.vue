<template>
  <section id="about" class="about">
    <div class="about__content">
      <p class="about__eyebrow">PLAYER INFO</p>
      <h2 class="about__title">About</h2>

      <p class="about__description">
        I am a developer who enjoys creating playful digital experiences,
        experimenting with new ideas and turning small details into something
        worth exploring.
      </p>
    </div>
  </section>
</template>

<style scoped>
.about {
  min-height: 60vh;
  padding: 120px 24px;
  background-color: var(--ui-surface);
  border-top: 4px solid var(--ui-ink);
}

.about__content {
  width: min(100%, 760px);
  margin: 0 auto;
  text-align: center;
}

.about__eyebrow {
  margin: 0 0 14px;
  color: var(--ui-muted);
  font-family: "Silkscreen", monospace;
  font-size: 12px;
  letter-spacing: 2px;
}

.about__title {
  margin: 0;
  color: var(--ui-ink);
  font-family: "Press Start 2P", monospace;
  font-size: clamp(26px, 5vw, 42px);
  line-height: 1.3;
  text-transform: uppercase;
  text-shadow: 4px 4px 0 rgba(255, 255, 255, 0.4);
}

.about__description {
  max-width: 620px;
  margin: 24px auto 0;
  color: var(--ui-muted);
  font-size: 23px;
  line-height: 1.4;
}

@media (max-width: 600px) {
  .about {
    padding: 90px 18px;
  }
}
</style>
