<template>
  <div>
    <h1>Workouts</h1>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <router-link
        v-for="workout in workouts"
        :key="workout.id"
        :to="`/workout/${workout.id}`"
      >
        <WorkoutCard
          :title="workout.title"
          :description="workout.description"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import WorkoutCard from "../components/WorkoutCard.vue";
import { useWorkoutStore } from "../store/workoutStore";
import { computed, onMounted } from "vue";

const store = useWorkoutStore();

onMounted(() => {
  store.fetchWorkouts();
});

const workouts = computed(() => store.workouts);
</script>
<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
