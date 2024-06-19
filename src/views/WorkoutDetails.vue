<template>
  <div>
    <Navbar :title="workout?.details?.name" :sub-title="workout?.details?.type">
      <a-button
        type="primary"
        :icon="h(PlusOutlined)"
        @click="() => (openAdd = true)"
      >
        Add
      </a-button>
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
      >
        <a-dropdown>
          <template #overlay>
            <a-menu @click="(info: any) => handleActions(exercise, info)">
              <a-menu-item key="delete">delete</a-menu-item>
              <a-menu-item key="edit">edit</a-menu-item>
            </a-menu>
          </template>
          <a-button type="text">
            <EllipsisOutlined />
          </a-button>
        </a-dropdown>
      </ExerciseCard>
    </TransitionGroup>
    <div v-else>
      <p style="display: flex; justify-content: center">No exercises found</p>
    </div>
    <AddExercise :open="openAdd" @close-modal="addExercise" />
  </div>
</template>
<script setup lang="ts">
import Navbar from "../components/global/Navbar.vue";
import { useRoute } from "vue-router";
import { useWorkoutStore } from "../store/workoutStore";
import { computed, onMounted, h, ref } from "vue";
import ExerciseCard from "../components/exercises/ExerciseCard.vue";
import AddExercise from "../components/exercises/AddExercise.vue";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons-vue";

const route = useRoute();
const store = useWorkoutStore();

onMounted(() => {
  store.fetchWorkoutExercises(route.params.id as string);
});

const workout = computed(() => store.currentWorkout);

const openAdd = ref(false);

const addExercise = async (values: any) => {
  if (values) {
    await store.addExerciseToWorkout({
      workoutId: route.params.id,
      ...values,
    });
  }
  store.fetchWorkoutExercises(route.params.id as string);
  openAdd.value = false;
};

const handleActions = async (exercise: any, info: any) => {
  if (info.key === "delete") {
    const response = await store.deleteExerciseFromWorkout(exercise.id);
    if (response) {
      store.fetchWorkoutExercises(route.params.id as string);
    }
  } else if (info.key === "edit") {
    console.log("edit", exercise);
  }
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
.ant-card-actions {
  display: flex;
  justify-content: space-between;
}
</style>
