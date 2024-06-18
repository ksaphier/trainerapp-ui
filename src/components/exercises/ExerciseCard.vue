<template>
  <a-card
    hoverable
    :bordered="false"
    @click="activeKey = activeKey.includes('1') ? [] : ['1']"
  >
    <a-card-meta :title="title">
      <template v-if="weight" #avatar>
        <div class="weight-container">
          <b class="weight">{{ weight }}</b> kg
        </div>
      </template>
    </a-card-meta>
    <a-collapse
      v-model:activeKey="activeKey"
      ghost
      style="pointer-events: none; height: auto; min-height: min-content"
    >
      <a-collapse-panel key="1" :showArrow="false">
        <p>
          {{ description }}
        </p>
      </a-collapse-panel>
    </a-collapse>
    <template v-if="!!series || !!reps || !!rest" #actions>
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
import { ref } from "vue";
defineProps({
  title: { type: String, default: "Title" },
  description: { type: String, default: "Description" },
  series: { type: Number },
  reps: { type: Number },
  rest: { type: Number },
  weight: { type: Number },
});

const activeKey = ref(["0"]);
</script>
<style scoped>
b {
  color: var(--text-color);
}

.weight-container {
  display: inline-block;
  text-align: end;
  background-color: var(--text-color);
  color: var(--back-color);
  width: 92px;
  padding-right: 6px;
  border-radius: 6px;
}

.weight {
  font-size: 1.5rem;
  color: var(--back-color);
}

.ant-card-meta {
  justify-content: space-between;
  flex-direction: row-reverse;
}

.ant-collapse-content-box > p {
  margin: 0px;
}
</style>
