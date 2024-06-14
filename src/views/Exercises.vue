<template>
  <Navbar title="Exercises" :backIcon="false">
    <a-button
      type="primary"
      :icon="h(PlusOutlined)"
      @click="() => (openNew = true)"
      >New</a-button
    >
  </Navbar>
  <TransitionGroup name="list" tag="div">
    <a-card
      v-for="exercise in exercises"
      :key="exercise.id"
      :title="exercise.name"
      :description="exercise.description"
    >
      <p>{{ exercise.description }}</p>
    </a-card>
  </TransitionGroup>
</template>
<script lang="ts" setup>
import { h, onMounted, computed, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";

import Navbar from "../components/global/Navbar.vue";
import { useWorkoutStore } from "../store/workoutStore";

const store = useWorkoutStore();

onMounted(() => {
  store.fetchExercises();
});

const exercises = computed(() => store.exercises);

const openNew = ref(false);
</script>
