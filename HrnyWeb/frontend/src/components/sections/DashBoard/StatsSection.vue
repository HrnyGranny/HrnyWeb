<script setup>
import Card from "@/components/ui/Card.vue"

defineProps({
  isConnected: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section class="dashboard__grid" aria-label="Dashboard statistics">
    <Card title="Server" chip="LOCAL" :reward="isConnected ? 'ON' : 'OFF'" meta="status">
      <p>{{ isConnected ? "Connection established." : "Waiting for connection." }}</p>
    </Card>

    <Card title="Requests" chip="LOCAL" reward="00" meta="today">
      <p>Traffic will appear here.</p>
    </Card>

    <Card title="Storage" chip="LOCAL" reward="00" meta="files">
      <p>Uploaded files will appear here.</p>
    </Card>
  </section>
</template>

<style scoped>
.dashboard__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.dashboard__grid :deep(.ui-card) {
  max-width: none;
  min-height: 190px;
}

@media (max-width: 760px) {
  .dashboard__grid {
    grid-template-columns: 1fr;
  }
}
</style>