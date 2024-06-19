import { defineStore } from "pinia";
import { ref } from "vue";
import { Workout, CurrentWorkout, Exercise } from "../types";
import axios from "axios";

const baseURL = "http://192.168.1.17:8080";

export const useWorkoutStore = defineStore("workout", () => {
  const workouts = ref<Workout[]>([]);
  const exercises = ref<Exercise[]>([]);
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
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteExerciseFromWorkout(id: number) {
    try {
      await axios.delete(`${baseURL}/workouts/deleteExercise/${id}`);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchExercises() {
    try {
      const response = await axios.get(`${baseURL}/exercises`);
      exercises.value = response.data;
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function createExercise(exercise: Exercise) {
    try {
      const response = await axios.post(`${baseURL}/exercises`, exercise, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteExercise(id: string) {
    try {
      const response = await axios.delete(`${baseURL}/exercises/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteWorkout(id: number) {
    try {
      await axios.delete(`${baseURL}/workouts/${id}`);
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return {
    workouts,
    exercises,
    currentWorkout,
    fetchWorkouts,
    fetchWorkoutExercises,
    createWorkout,
    addExerciseToWorkout,
    fetchExercises,
    createExercise,
    deleteExercise,
    deleteWorkout,
    deleteExerciseFromWorkout,
  };
});
