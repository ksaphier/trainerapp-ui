import { defineStore } from "pinia";
import { ref } from "vue";
import { Workout, CurrentWorkout, Exercise } from "../types";

export const useWorkoutStore = defineStore("workout", () => {
  const workouts = ref<Workout[]>([]);
  const currentWorkout = ref<CurrentWorkout | null>(null);

  async function fetchWorkouts() {
    const response = await fetch("/testdata/workouts.json");
    const data = await response.json();
    workouts.value = data.workouts;
  }

  async function fetchWorkoutExercises(id: string) {
    try {
      const workoutResponse = await fetch("/testdata/workouts.json");
      const exercisesResponse = await fetch("/testdata/workoutExercises.json");

      const workoutData = await workoutResponse.json();
      const exercisesData = await exercisesResponse.json();

      const selectedWorkout = workoutData.workouts.find(
        (workout: Workout) => workout.id === id
      );
      if (selectedWorkout) {
        currentWorkout.value = {
          ...selectedWorkout,
          exercises: exercisesData.workoutExercises.filter(
            (exercise: Exercise) => exercise.workoutId === id
          ),
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    workouts,
    currentWorkout,
    fetchWorkouts,
    fetchWorkoutExercises,
  };
});
