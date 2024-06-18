<template>
  <Navbar title="Exercises" :backIcon="false">
    <a-button
      type="primary"
      :icon="h(PlusOutlined)"
      @click="() => (openNew = true)"
      >New</a-button
    >
  </Navbar>
  <TransitionGroup name="list" tag="div" v-if="exercises">
    <ExerciseCard
      v-for="exercise in exercises"
      :key="exercise.id"
      :title="exercise.name"
      :description="exercise.description"
      :series="exercise.series"
      :reps="exercise.reps"
      :rest="exercise.rest"
      :weight="exercise.weight"
    />
  </TransitionGroup>
  <div v-else>
    <p style="display: flex; justify-content: center">No exercises found</p>
  </div>
  <NewExercise :open="openNew" @close-modal="newExercise" />
</template>
<script lang="ts" setup>
import { h, onMounted, computed, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";

import Navbar from "../components/global/Navbar.vue";
import { useWorkoutStore } from "../store/workoutStore";

import ExerciseCard from "../components/exercises/ExerciseCard.vue";
import NewExercise from "../components/exercises/NewExercise.vue";

const store = useWorkoutStore();

onMounted(() => {
  store.fetchExercises();
});

const exercises = computed(() => store.exercises);

const openNew = ref(false);

const newExercise = async (values: any) => {
  if (values) {
    await store.createExercise(values);
  }
  store.fetchExercises();
  openNew.value = false;
};
</script>
<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.list-leave-active {
  position: absolute;
}

.navbar + div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
