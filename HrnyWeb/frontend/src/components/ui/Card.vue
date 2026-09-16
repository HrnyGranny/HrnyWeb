<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  chip: {
    type: String,
    default: "",
  },
  reward: {
    type: String,
    default: "",
  },
  meta: {
    type: String,
    default: "",
  },
})
</script>

<template>
  <article class="ui-card">
    <header
      v-if="title || chip || $slots.header"
      class="ui-card__head"
    >
      <slot name="header">
        <h3 v-if="title" class="ui-card__title">
          {{ title }}
        </h3>

        <span v-if="chip" class="ui-card__chip">
          {{ chip }}
        </span>
      </slot>
    </header>

    <div class="ui-card__body">
      <slot />
    </div>

    <footer
      v-if="reward || meta || $slots.footer"
      class="ui-card__foot"
    >
      <slot name="footer">
        <span v-if="reward" class="ui-card__reward">
          {{ reward }}
        </span>

        <span v-if="meta" class="ui-card__meta">
          {{ meta }}
        </span>
      </slot>
    </footer>
  </article>
</template>

<style scoped>
.ui-card {
  --ui-card-notch: 12px;

  position: relative;
  width: 100%;
  max-width: 300px;
  padding: 24px;
  box-sizing: border-box;
  background-color: var(--ui-surface);
  color: var(--ui-ink);
  font-family: var(--ui-font-body);

  clip-path: polygon(
    var(--ui-card-notch) 0,
    calc(100% - var(--ui-card-notch)) 0,
    100% var(--ui-card-notch),
    100% calc(100% - var(--ui-card-notch)),
    calc(100% - var(--ui-card-notch)) 100%,
    var(--ui-card-notch) 100%,
    0 calc(100% - var(--ui-card-notch)),
    0 var(--ui-card-notch)
  );

  box-shadow:
    0 -4px rgba(0, 0, 0, 0.35) inset,
    0 4px rgba(255, 255, 255, 0.75) inset,
    -4px 0 rgba(255, 255, 255, 0.35) inset,
    4px 0 rgba(0, 0, 0, 0.35) inset,
    0 6px 0 rgba(0, 0, 0, 0.3);
}

.ui-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  margin-bottom: 16px;
  border-bottom: 2px dashed var(--ui-muted);
}

.ui-card__title {
  margin: 0;
  color: var(--ui-ink);
  font-family: var(--ui-font-display);
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: 0.5px;
}

.ui-card__chip {
  flex-shrink: 0;
  padding: 4px 8px;
  color: var(--ui-ink);
  background-color: var(--ui-gold);
  border: 2px solid var(--ui-ink);
  font-family: var(--ui-font-label);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
}

.ui-card__body {
  color: var(--ui-ink);
  font-size: 18px;
  line-height: 1.4;
}

.ui-card__body :deep(p) {
  margin: 0;
}

.ui-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 2px dashed var(--ui-muted);
}

.ui-card__reward {
  color: var(--ui-primary);
  font-family: var(--ui-font-display);
  font-size: 12px;
  line-height: 1.4;
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.18);
}

.ui-card__meta {
  color: var(--ui-muted);
  font-family: var(--ui-font-label);
  font-size: 10px;
  text-align: right;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>