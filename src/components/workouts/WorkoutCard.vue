<template>
  <a-card hoverable :bordered="false">
    <router-link :to="`/workout/${id}`">
      <a-card-meta :title="title">
        <template #avatar>
          <PlayCircleFilled v-if="type === 'standard'" />
          <ClockCircleFilled v-else />
        </template>
      </a-card-meta>
    </router-link>
    <template #actions>
      <slot></slot>
    </template>
  </a-card>
</template>

<script setup lang="ts">
import { PlayCircleFilled, ClockCircleFilled } from "@ant-design/icons-vue";

defineProps({
  id: { type: Number, default: 0 },
  title: { type: String, default: "Title" },
  description: { type: String, default: "" },
  type: { type: String, default: "standard" },
});
</script>
<style scoped>
.ant-card-meta {
  align-items: center;
  flex-direction: row-reverse;
}
.anticon {
  font-size: 1.5rem;
  color: var(--text-color);
}
</style>
