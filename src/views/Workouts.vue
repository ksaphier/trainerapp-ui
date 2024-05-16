<template>
  <div>
    <h1>Workouts</h1>
    <!-- <div style="display: flex; flex-direction: column; gap: 1rem"> -->
    <TransitionGroup name="list" tag="div">
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
    </TransitionGroup>
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import WorkoutCard from "../components/WorkoutCard.vue";
import { useWorkoutStore } from "../store/workoutStore";
import { computed, onMounted } from "vue";

const store = useWorkoutStore();

onMounted(() => {
  store.fetchWorkouts();
  store.currentWorkout = null;
});

const workouts = computed(() => store.workouts);
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
h1 + div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
