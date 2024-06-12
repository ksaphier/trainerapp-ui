<template>
  <a-card hoverable :bordered="false">
    <a-card-meta :title="title">
      <template #avatar>
        <PlayCircleOutlined v-if="type === 'standard'" />
        <ClockCircleOutlined v-else />
      </template>
    </a-card-meta>
  </a-card>
</template>

<script setup lang="ts">
import { PlayCircleOutlined, ClockCircleOutlined } from "@ant-design/icons-vue";

defineProps({
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
}
</style>
