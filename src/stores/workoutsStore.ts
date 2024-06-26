import { defineStore } from "pinia";
import { axiosService } from "../services/axiosService";
import { Exercise, Workout, CurrentWorkout } from "../types";
import { useAuthStore } from "./authStore";

const authStore = useAuthStore();

const config = {
  headers: { Authorization: `Bearer ${authStore.accessToken}` },
};

export const useWorkoutsStore = defineStore("workouts", {
  state: () => ({
    workouts: [] as Workout[],
    currentWorkout: null as CurrentWorkout | null,
  }),
  actions: {
    async fetchWorkouts() {
      const [workouts, error] = await axiosService.get("/workouts", config);
      if (error) {
        console.error(error);
        return;
      }
      this.workouts = workouts;
    },
    async fetchWorkoutDetails(id: string) {
      const [workout, error] = await axiosService.get(
        `/workouts/${id}/details`,
        config
      );
      if (error) {
        console.error(error);
        return;
      }
      this.currentWorkout = workout;
    },
    async createWorkout(workout: Workout) {
      const [newWorkout, error] = await axiosService.post(
        "/workouts",
        workout,
        config
      );
      if (error) {
        console.error(error);
        return;
      }
      return newWorkout;
    },
    async addExerciseToWorkout(exercise: Exercise) {
      const [updatedWorkout, error] = await axiosService.post(
        "/workouts/addExercise",
        exercise,
        config
      );
      if (error) {
        console.error(error);
        return;
      }
      return updatedWorkout;
    },
    async deleteExerciseFromWorkout(id: number) {
      const [_deletedExercise, error] = await axiosService.delete(
        `/workouts/deleteExercise/${id}`,
        config
      );
      if (error) {
        console.error(error);
        return;
      }
      return true;
    },

    async deleteWorkout(id: number) {
      const [_deleted, error] = await axiosService.delete(
        `/workouts/${id}`,
        config
      );
      if (error) {
        console.error(error);
        return;
      }
      return true;
    },
  },
});
