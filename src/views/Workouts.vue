<template>
  <div>
    <h1>Workouts</h1>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <WorkoutCard
        v-for="workout in workouts"
        :key="workout.title"
        :title="workout.title"
        :description="workout.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import WorkoutCard from "../components/WorkoutCard.vue";
import { ref } from "vue";

const workouts = ref([
  { title: "Leg day", description: "A workout for your legs!" },
  { title: "Arm day", description: "A workout for your arms!" },
  { title: "Core day", description: "A workout for your core!" },
]);
</script>
