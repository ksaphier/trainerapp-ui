import { defineStore } from "pinia";
import { axiosService } from "../services/axiosService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
  }),
  actions: {
    async register(credentials: {
      username: string;
      email: string;
      password: string;
    }) {
      const [message, error] = await axiosService.post(
        "/api/auth/register",
        credentials
      );
      if (error) {
        console.error(error);
        return;
      }
      return message;
    },
    async login(credentials: { username: string; password: string }) {
      const [accessToken, error] = await axiosService.post(
        "/api/auth/login",
        credentials
      );
      if (error) {
        console.error(error);
        return;
      }
      this.accessToken = accessToken;
      return accessToken;
    },
    logout() {
      this.accessToken = null;
      location.reload();
    },
  },
});
