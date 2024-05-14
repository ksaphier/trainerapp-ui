<template>
  <a-card hoverable>
    <a-card-meta :title="title" :description="description"> </a-card-meta>
  </a-card>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: "Title" },
  description: { type: String, default: "Description" },
});
</script>

<style scoped>
.icons {
  font-size: 1.5rem !important;
}
</style>
