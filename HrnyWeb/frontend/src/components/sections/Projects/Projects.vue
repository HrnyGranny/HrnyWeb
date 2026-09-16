<script setup>
import { computed, ref } from "vue"

import Card from "@/components/ui/Card.vue"
import Button from "@/components/ui/Button.vue"

const projects = [
  {
    id: 1,
    title: "Mail4all",
    status: "In progress",
    description:
      "Completely free web app to send, receive and check emails anonymously, with no registration required.",
    technology: "Vue / Node.js",
    type: "WebApp",
    githubUrl: "",
    websiteUrl: "https://mail4all.app",
  },
  {
    id: 2,
    title: "FileForge",
    status: "Released",
    description: "Desktop app to compress files.",
    technology: "C#",
    type: "DesktopApp",
    githubUrl: "https://github.com/HrnyGranny/FileForge",
    websiteUrl: "",
  },
  {
    id: 3,
    title: "GhostPointer",
    status: "Released",
    description:
      "A Python project focused on pointer interaction.",
    technology: "Python",
    type: "DesktopApp",
    githubUrl: "https://github.com/HrnyGranny/GhostPointer",
    websiteUrl: "",
  },
  {
    id: 4,
    title: "LucIA",
    status: "Prototype",
    description: "A girlfriend AI assistant.",
    technology: "Python",
    type: "DesktopApp",
    githubUrl: "https://github.com/HrnyGranny/LucIA",
    websiteUrl: "",
  },
]

const selectedType = ref("all")

const filteredProjects = computed(() => {
  if (selectedType.value === "all") {
    return projects
  }

  return projects.filter((project) => project.type === selectedType.value)
})
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

    <div class="projects__filters">
      <label class="projects__type-filter">
        <span class="visually-hidden">Filter projects by type</span>
        <select v-model="selectedType" aria-label="Filter projects by type">
          <option value="all">All projects</option>
          <option value="WebApp">WebApp</option>
          <option value="DesktopApp">DesktopApp</option>
        </select>
      </label>
    </div>

    <div class="projects__grid">
      <Card
        v-for="project in filteredProjects"
        :key="project.id"
        :title="project.title"
        :chip="project.status"
        :meta="project.technology"
      >
        <div class="projects__card-content">
          <p>{{ project.description }}</p>

          <div class="projects__actions">
            <Button
              :href="project.websiteUrl || project.githubUrl"
              :disabled="!project.websiteUrl && !project.githubUrl"
            >
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
}

.projects__header {
  width: min(100%, 760px);
  margin: 0 auto 54px;
  text-align: center;
}

.projects__eyebrow {
  margin: 0 0 14px;
  color: var(--ui-muted);
  font-family: var(--ui-font-label);
  font-size: 12px;
  letter-spacing: 2px;
}

.projects__title {
  margin: 0;
  color: var(--ui-ink);
  font-family: var(--ui-font-display);
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

.projects__filters {
  display: flex;
  justify-content: flex-end;
  width: min(100%, 1000px);
  margin: 0 auto 28px;
}

.projects__type-filter select {
  min-height: 44px;
  padding: 10px 14px;
  color: var(--ui-ink);
  background-color: var(--ui-surface-sunken);
  border: 2px solid var(--ui-ink);
  border-radius: 0;
  outline: none;
  font-family: var(--ui-font-body);
  font-size: 22px;
  box-shadow:
    0 4px rgba(0, 0, 0, 0.4) inset,
    0 -4px rgba(255, 255, 255, 0.55) inset,
    4px 0 rgba(0, 0, 0, 0.25) inset,
    -4px 0 rgba(255, 255, 255, 0.25) inset;
}

.projects__type-filter select:hover,
.projects__type-filter select:focus-visible {
  background-color: var(--ui-surface);
}

.projects__type-filter select:focus-visible {
  box-shadow:
    0 4px rgba(0, 0, 0, 0.4) inset,
    0 -4px rgba(255, 255, 255, 0.55) inset,
    4px 0 rgba(0, 0, 0, 0.25) inset,
    -4px 0 rgba(255, 255, 255, 0.25) inset;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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
