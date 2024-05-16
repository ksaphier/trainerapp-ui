<template>
  <div>
    <h1>{{ workout?.title }}</h1>
    <p>{{ workout?.description }}</p>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <div v-for="exercise in workout?.exercises" :key="exercise.id">
        <ExerciseCard
          :title="exercise.title"
          :description="exercise.description"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { useWorkoutStore } from "../store/workoutStore";
import { computed, onMounted } from "vue";
import ExerciseCard from "../components/ExerciseCard.vue";

const route = useRoute();
const store = useWorkoutStore();

onMounted(() => {
  store.fetchWorkoutExercises(route.params.id as string);
});

const workout = computed(() => store.currentWorkout);
</script>
