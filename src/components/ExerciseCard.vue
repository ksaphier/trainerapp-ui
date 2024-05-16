<template>
  <a-card hoverable :bordered="false">
    <a-card-meta :title="title" :description="description"> </a-card-meta>
    <template #actions>
      <span
        >Series: <b>{{ series }}</b></span
      >
      <span
        >Reps: <b>{{ reps }}</b></span
      >
      <span
        >Rest: <b>{{ rest }} sec</b></span
      >
    </template>
  </a-card>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: "Title" },
  description: { type: String, default: "Description" },
  series: { type: Number, default: 4 },
  reps: { type: Number, default: 8 },
  rest: { type: Number, default: 90 },
});
</script>
<style scoped>
b {
  color: var(--text-color);
}
</style>
