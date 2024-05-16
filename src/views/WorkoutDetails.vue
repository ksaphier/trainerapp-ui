<template>
  <div>
    <h1>{{ workout?.title }}</h1>
    <p>{{ workout?.description }}</p>
    <TransitionGroup name="list" tag="div">
      <ExerciseCard
        v-for="exercise in workout?.exercises"
        :key="exercise.id"
        :title="exercise.title"
        :description="exercise.description"
        :series="exercise.series"
        :reps="exercise.reps"
        :rest="exercise.rest"
        :weight="exercise.weight"
      />
    </TransitionGroup>
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

<style>
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
p + div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
