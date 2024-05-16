<template>
  <a-card hoverable :bordered="false">
    <a-card-meta :title="title" :description="description"> </a-card-meta>
  </a-card>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: "Title" },
  description: { type: String, default: "Description" },
});
</script>
