<template>
  <div>
    <Navbar :title="workout?.details?.name" :sub-title="workout?.details?.type">
      <a-button
        type="primary"
        :icon="h(PlusOutlined)"
        @click="() => (openNew = true)"
        >Add</a-button
      >
    </Navbar>
    <p>{{ workout?.details.description }}</p>
    <TransitionGroup
      name="list"
      tag="div"
      v-if="workout?.exercises?.length ?? 0 > 0"
    >
      <ExerciseCard
        v-for="exercise in workout?.exercises"
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
    <NewExercise :open="openNew" @close-modal="addExercise" />
  </div>
</template>
<script setup lang="ts">
import Navbar from "../components/global/Navbar.vue";
import { useRoute } from "vue-router";
import { useWorkoutStore } from "../store/workoutStore";
import { computed, onMounted, h, ref } from "vue";
import ExerciseCard from "../components/exercises/ExerciseCard.vue";
import NewExercise from "../components/exercises/NewExercise.vue";
import { PlusOutlined } from "@ant-design/icons-vue";

const route = useRoute();
const store = useWorkoutStore();

onMounted(() => {
  store.fetchWorkoutExercises(route.params.id as string);
});

const workout = computed(() => store.currentWorkout);

const openNew = ref(false);

const addExercise = (values: any) => {
  if (values)
    console.log("new exercise", { workoutId: route.params.id, ...values });
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
p + div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
