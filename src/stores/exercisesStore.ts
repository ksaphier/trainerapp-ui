import { defineStore } from "pinia";
import { axiosService } from "../services/axiosService";
import { Exercise } from "../types";
import { useAuthStore } from "./authStore";

const authStore = useAuthStore();

const config = {
  headers: { Authorization: `Bearer ${authStore.accessToken}` },
};

export const useExercisesStore = defineStore("exercises", {
  state: () => ({
    exercises: [] as Exercise[],
  }),
  actions: {
    async fetchExercises() {
      const [exercises, error] = await axiosService.get("/exercises", config);
      if (error) {
        console.error(error);
        return;
      }
      this.exercises = exercises;
    },
    async createExercise(exercise: Exercise) {
      const [newExercise, error] = await axiosService.post(
        "/exercises",
        exercise,
        config
      );
      if (error) {
        console.error(error);
        return;
      }
      return newExercise;
    },
    async deleteExercise(id: string) {
      const [message, error] = await axiosService.delete(
        `/exercises/${id}`,
        config
      );
      if (error) {
        console.error(error);
        return;
      }
      return message;
    },
  },
});
