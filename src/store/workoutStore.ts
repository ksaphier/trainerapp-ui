import { defineStore } from "pinia";
import { ref } from "vue";
import { Workout, CurrentWorkout } from "../types";
import axios from "axios";

const baseURL = "http://192.168.1.17:8080";

export const useWorkoutStore = defineStore("workout", () => {
  const workouts = ref<Workout[]>([]);
  const currentWorkout = ref<CurrentWorkout | null>(null);

  async function fetchWorkouts() {
    try {
      const response = await axios.get(`${baseURL}/workouts`);
      workouts.value = response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchWorkoutExercises(id: string) {
    try {
      const response = await axios.get(`${baseURL}/workouts/${id}/details`);
      currentWorkout.value = response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function createWorkout(workout: Workout) {
    try {
      const response = await axios.post(`${baseURL}/workouts`, workout, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function addExerciseToWorkout(exercise: any) {
    try {
      const response = await axios.post(
        `${baseURL}/workouts/addExercise`,
        exercise,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    workouts,
    currentWorkout,
    fetchWorkouts,
    fetchWorkoutExercises,
    createWorkout,
    addExerciseToWorkout,
  };
});
