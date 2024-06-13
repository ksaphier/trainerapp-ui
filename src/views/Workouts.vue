<template>
  <div>
    <Navbar title="Workouts" :backIcon="false">
      <a-button
        type="primary"
        :icon="h(PlusOutlined)"
        @click="() => (openNew = true)"
        >New</a-button
      >
    </Navbar>
    <TransitionGroup name="list" tag="div">
      <router-link
        v-for="workout in workouts"
        :key="workout.id"
        :to="`/workout/${workout.id}`"
      >
        <WorkoutCard :title="workout.name" :type="workout.type" />
      </router-link>
    </TransitionGroup>
    <NewWorkout :open="openNew" @close-modal="createNewWorkout" />
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/global/Navbar.vue";
import NewWorkout from "../components/workouts/NewWorkout.vue";
import WorkoutCard from "../components/workouts/WorkoutCard.vue";
import { useWorkoutStore } from "../store/workoutStore";
import { computed, onMounted, ref, h } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";

const store = useWorkoutStore();

onMounted(() => {
  store.fetchWorkouts();
  store.currentWorkout = null;
});

const workouts = computed(() => store.workouts);

const openNew = ref(false);

const createNewWorkout = (values: any) => {
  if (values) store.createWorkout(values);
  else openNew.value = false;
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
