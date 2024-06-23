const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/workouts",
    name: "Workouts",
    component: () => import("../views/Workouts.vue"),
  },
  {
    path: "/exercises",
    name: "Exercises",
    component: () => import("../views/Exercises.vue"),
  },
  {
    path: "/workout/:id",
    name: "WorkoutDetails",
    component: () => import("../views/WorkoutDetails.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterView.vue"),
  },
];

export default routes;
