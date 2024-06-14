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
];

export default routes;
