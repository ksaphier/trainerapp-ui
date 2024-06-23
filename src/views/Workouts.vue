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
      <WorkoutCard
        v-for="workout in workouts"
        :title="workout.name"
        :type="workout.type"
        :id="workout.id"
        :key="workout.id"
      >
        <a-button
          type="text"
          shape="circle"
          :icon="h(DeleteFilled)"
          @click="() => deleteWorkout(workout.id)"
          :loading="deleteLoader"
        />
        <a-button
          type="text"
          shape="circle"
          :icon="h(EditFilled)"
          @click="() => console.log('edit', workout)"
        />
      </WorkoutCard>
    </TransitionGroup>
    <NewWorkout :open="openNew" @close-modal="createNewWorkout" />
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/global/Navbar.vue";
import NewWorkout from "../components/workouts/NewWorkout.vue";
import WorkoutCard from "../components/workouts/WorkoutCard.vue";
import { useWorkoutsStore } from "../stores/workoutsStore";
import { computed, onMounted, ref, h } from "vue";
import { PlusOutlined, DeleteFilled, EditFilled } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const store = useWorkoutsStore();

onMounted(() => {
  store.fetchWorkouts();
  store.currentWorkout = null;
});

const workouts = computed(() => store.workouts);

const openNew = ref(false);

const router = useRouter();

const createNewWorkout = async (values: any) => {
  if (values) {
    const response = await store.createWorkout(values);
    router.push(`/workout/${response.id}`);
  }
  openNew.value = false;
};

const deleteLoader = ref(false);

const deleteWorkout = async (id: number) => {
  deleteLoader.value = true;
  await store.deleteWorkout(id);
  deleteLoader.value = false;
  store.fetchWorkouts();
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
