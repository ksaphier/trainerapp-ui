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
];

export default routes;
