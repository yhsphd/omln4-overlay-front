import { createRouter, createWebHistory } from "vue-router";
import CountdownScene from "../views/scenes/CountdownScene.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/countdown",
      name: "countdown",
      component: CountdownScene,
    },
  ],
});

export default router;
