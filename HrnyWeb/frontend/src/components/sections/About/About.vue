<script setup>
import Icon from "@/components/ui/Icon.vue"

const technologyGroups = [
  {
    title: "Web Development",
    symbol: "▣",
    technologies: [
      {
        name: "JavaScript",
        slug: "javascript",
      },
      {
        name: "React",
        slug: "react",
      },
      {
        name: "Angular",
        slug: "angular",
      },
      {
        name: "Vue",
        slug: "vuedotjs",
      },
      {
        name: "Node.js",
        slug: "nodedotjs",
      },
      {
        name: "CSS",
        slug: "css3",
      },
      {
        name: "HTML",
        slug: "html5",
      },
    ],
  },
  {
    title: "Programming Languages",
    symbol: "⌨",
    technologies: [
      {
        name: "Java",
        slug: "openjdk",
      },
      {
        name: "Python",
        slug: "python",
      },
      {
        name: "C++",
        slug: "cplusplus",
      },
      {
        name: "C",
        slug: "c",
      },
    ],
  },
  {
    title: "Databases",
    symbol: "▤",
    technologies: [
      {
        name: "MySQL",
        slug: "mysql",
      },
      {
        name: "MongoDB",
        slug: "mongodb",
      },
    ],
  },
  {
    title: "Systems & Cloud",
    symbol: "◎",
    technologies: [
      {
        name: "Linux",
        slug: "linux",
      },
      {
        name: "Windows",
        slug: "windows11",
      },
      {
        name: "Azure",
        slug: "microsoftazure",
      },
      {
        name: "AWS",
        slug: "amazonaws",
      },
    ],
  },
  {
    title: "Infrastructure & Security",
    symbol: "◆",
    technologies: [
      {
        name: "Firebase",
        slug: "firebase",
      },
      {
        name: "Cloudflare",
        slug: "cloudflare",
      },
      {
        name: "Kubernetes",
        slug: "kubernetes",
      },
    ],
  },
  {
    title: "Development Tools",
    symbol: "⚙",
    technologies: [
      {
        name: "GitHub",
        slug: "github",
      },
      {
        name: "Docker",
        slug: "docker",
      },
      {
        name: "Git",
        slug: "git",
      },
      {
        name: "Visual Studio",
        slug: "visualstudio",
      },
      {
        name: "VS Code",
        slug: "visualstudiocode",
      },
    ],
  },
]
</script>

<template>
  <section id="about" class="about">
    <header class="about__header">
      <p class="about__eyebrow">
        PLAYER PROFILE
      </p>

      <h2 class="about__title">
        About Me
      </h2>

      <p class="about__description">
        Developer turning ideas into software.
      </p>
    </header>

    <div class="about__inventory">
      <div class="about__inventory-head">
        <span>Category</span>
        <span>Technologies</span>
      </div>

      <div
        v-for="group in technologyGroups"
        :key="group.title"
        class="about__group"
      >
        <div class="about__category">
          <span
            class="about__category-symbol"
            aria-hidden="true"
          >
            {{ group.symbol }}
          </span>

          <h3 class="about__category-title">
            {{ group.title }}
          </h3>
        </div>

        <div class="about__technologies">
          <div
            v-for="technology in group.technologies"
            :key="technology.name"
            class="about__technology"
          >
            <Icon
              class="about__technology-icon"
              title=""
              text=""
              :aria-label="`${technology.name} logo`"
            >
              <template #icon>
                <img
                  :src="`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${technology.slug}.svg`"
                  :alt="`${technology.name} logo`"
                />
              </template>
            </Icon>

            <span class="about__technology-name">
              {{ technology.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  padding: 120px 24px;
  background-color: var(--ui-surface-sunken);
  background-image:
    linear-gradient(rgba(109, 85, 38, 0.08) 2px, transparent 2px),
    linear-gradient(90deg, rgba(109, 85, 38, 0.08) 2px, transparent 2px);
  background-size: 32px 32px;
  border-top: 4px solid var(--ui-ink);
  box-shadow: 0 -8px 0 rgba(0, 0, 0, 0.25);
}

/* Cabecera original */

.about__header {
  width: min(100%, 760px);
  margin: 0 auto 54px;
  text-align: center;
}

.about__eyebrow {
  margin: 0 0 14px;
  color: var(--ui-muted);
  font-family: var(--ui-font-label);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.about__title {
  margin: 0;
  color: var(--ui-ink);
  font-family: var(--ui-font-display);
  font-size: clamp(26px, 5vw, 42px);
  line-height: 1.3;
  text-transform: uppercase;
  text-shadow: 4px 4px 0 rgba(255, 255, 255, 0.4);
}

.about__description {
  margin: 20px auto 0;
  color: var(--ui-muted);
  font-size: 23px;
  line-height: 1.4;
}

/* Panel de tecnologías */

.about__inventory {
  width: min(100%, 1000px);
  margin: 0 auto;
  overflow: hidden;
  background-color: var(--ui-surface);
  border: 2px solid var(--ui-ink);
  box-shadow:
    0 -4px rgba(0, 0, 0, 0.25) inset,
    0 4px rgba(255, 255, 255, 0.65) inset,
    -4px 0 rgba(255, 255, 255, 0.25) inset,
    4px 0 rgba(0, 0, 0, 0.2) inset,
    0 8px 0 rgba(0, 0, 0, 0.3);
}

.about__inventory-head {
  display: grid;
  grid-template-columns: minmax(230px, 32%) 1fr;
  color: var(--ui-ink);
  background-color: var(--ui-surface-sunken);
  border-bottom: 2px solid var(--ui-ink);
  font-family: var(--ui-font-display);
  font-size: 10px;
  line-height: 1.4;
  text-transform: uppercase;
}

.about__inventory-head span {
  padding: 18px 20px;
}

.about__inventory-head span:first-child {
  border-right: 2px solid var(--ui-ink);
}

/* Filas */

.about__group {
  display: grid;
  grid-template-columns: minmax(230px, 32%) 1fr;
  min-height: 100px;
  background-color: var(--ui-surface);
  border-bottom: 2px solid color-mix(in srgb, var(--ui-muted) 32%, transparent);
}

.about__group:nth-child(odd) {
  background-color: color-mix(in srgb, var(--ui-surface) 70%, var(--ui-surface-sunken));
}

.about__group:last-child {
  border-bottom: 0;
}

/* Categoría */

.about__category {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-right: 2px solid color-mix(in srgb, var(--ui-muted) 32%, transparent);
}

.about__category-symbol {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 30px;
  width: 30px;
  height: 30px;
  color: var(--ui-primary);
  font-family: var(--ui-font-display);
  font-size: 16px;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.16);
}

.about__category-title {
  margin: 0;
  color: var(--ui-ink);
  font-family: var(--ui-font-label);
  font-size: 13px;
  line-height: 1.5;
  text-transform: uppercase;
}

/* Tecnologías */

.about__technologies {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding: 18px 20px;
}

.about__technology {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  cursor: default;
}

.about__technology-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
}

.about__technology-icon :deep(.ui-tooltip__trigger) {
  width: 52px;
  height: 52px;
  color: var(--ui-ink);
  background-color: var(--ui-surface);
  border: 2px solid var(--ui-ink);
  box-shadow:
    0 -4px rgba(0, 0, 0, 0.35) inset,
    0 4px rgba(255, 255, 255, 0.3) inset,
    -4px 0 rgba(255, 255, 255, 0.16) inset,
    4px 0 rgba(0, 0, 0, 0.25) inset,
    0 4px 0 rgba(0, 0, 0, 0.3);
}

.about__technology-icon :deep(.ui-tooltip__trigger:hover) {
  transform: translateY(-2px);
}

.about__technology-icon :deep(img) {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.about__technology-name {
  max-width: 76px;
  color: var(--ui-muted);
  font-family: var(--ui-font-label);
  font-size: 8px;
  line-height: 1.3;
  text-align: center;
  text-transform: uppercase;
}

/* Tablet */

@media (max-width: 760px) {
  .about__inventory-head {
    display: none;
  }

  .about__group {
    display: block;
    min-height: 0;
  }

  .about__category {
    padding: 14px 16px;
    background-color: color-mix(in srgb, var(--ui-muted) 8%, transparent);
    border-right: 0;
    border-bottom: 2px dashed color-mix(in srgb, var(--ui-muted) 32%, transparent);
  }

  .about__category-symbol {
    width: 26px;
    height: 26px;
    flex-basis: 26px;
    font-size: 13px;
  }

  .about__technologies {
    align-items: flex-start;
    padding: 18px 16px 22px;
  }
}

/* Móvil */

@media (max-width: 600px) {
  .about {
    padding: 90px 16px;
  }

  .about__header {
    margin-bottom: 38px;
  }

  .about__description {
    font-size: 20px;
  }

  .about__technologies {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px 8px;
  }

  .about__technology-icon,
  .about__technology-icon :deep(.ui-tooltip__trigger) {
    width: 48px;
    height: 48px;
  }

  .about__technology-name {
    max-width: 90px;
    font-size: 7px;
  }
}

@media (max-width: 370px) {
  .about__technologies {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .about__technology-icon :deep(.ui-tooltip__trigger) {
    transition: none;
  }
}
</style>