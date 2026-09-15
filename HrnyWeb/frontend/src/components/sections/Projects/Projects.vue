<script setup>
import Card from "@/components/ui/Card.vue"
import Button from "@/components/ui/Button.vue"

const projects = [
  {
    id: 1,
    title: "Project One",
    status: "Coming soon",
    description:
      "A short description explaining what the project does and why it was created.",
    technology: "Vue",
  },
  {
    id: 2,
    title: "Project Two",
    status: "Prototype",
    description:
      "Another project placeholder ready to be replaced with real information.",
    technology: "JavaScript",
  },
  {
    id: 3,
    title: "Project Three",
    status: "In progress",
    description:
      "A future project with links, technologies and additional information.",
    technology: "CSS",
  },
]
</script>

<template>
  <section id="projects" class="projects">
    <header class="projects__header">
      <p class="projects__eyebrow">SELECT A QUEST</p>
      <h2 class="projects__title">Projects</h2>

      <p class="projects__description">
        A collection of projects, experiments and things I have built.
      </p>
    </header>

    <div class="projects__grid">
      <Card
        v-for="project in projects"
        :key="project.id"
        :title="project.title"
        :chip="project.status"
        :meta="project.technology"
      >
        <div class="projects__card-content">
          <p>{{ project.description }}</p>

          <div class="projects__actions">
            <Button disabled>
              View project
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.projects {
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

.projects__header {
  width: min(100%, 760px);
  margin: 0 auto 54px;
  text-align: center;
}

.projects__eyebrow {
  margin: 0 0 14px;
  color: var(--ui-muted);
  font-family: "Silkscreen", monospace;
  font-size: 12px;
  letter-spacing: 2px;
}

.projects__title {
  margin: 0;
  color: var(--ui-ink);
  font-family: "Press Start 2P", monospace;
  font-size: clamp(26px, 5vw, 42px);
  line-height: 1.3;
  text-transform: uppercase;
  text-shadow: 4px 4px 0 rgba(255, 255, 255, 0.4);
}

.projects__description {
  margin: 20px auto 0;
  color: var(--ui-muted);
  font-size: 23px;
  line-height: 1.4;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 28px;
  width: min(100%, 1000px);
  margin: 0 auto;
}

.projects__grid :deep(.ui-card) {
  max-width: none;
}

.projects__grid :deep(.ui-card__chip) {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.projects__card-content {
  display: flex;
  flex-direction: column;
  min-height: 170px;
}

.projects__card-content p {
  margin: 0;
}

.projects__actions {
  display: flex;
  margin-top: auto;
  padding-top: 22px;
}

.projects__actions :deep(.ui-btn) {
  width: 100%;
  padding-inline: 12px;
  font-size: 9px;
}

@media (max-width: 900px) {
  .projects__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .projects {
    padding: 90px 18px;
  }

  .projects__grid {
    grid-template-columns: 1fr;
  }
}
</style>
