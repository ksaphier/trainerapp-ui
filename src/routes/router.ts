import { createRouter, createWebHistory } from "vue-router";
import routes from "../routes/routes";
import { useAuthStore } from "../stores/authStore";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !authStore.accessToken) {
    return next("/login");
  }

  next();
});

export default router;
