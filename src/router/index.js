import { createRouter, createWebHistory } from "vue-router";
import CountdownScene from "../views/scenes/CountdownScene.vue";
import GeneralMappoolScene from "@/views/scenes/GeneralMappoolScene.vue";
import ShowcaseScene from "@/views/scenes/ShowcaseScene.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/countdown",
      name: "countdown",
      component: CountdownScene,
    },
    {
      path: "/generalmappool",
      name: "generalmappool",
      component: GeneralMappoolScene,
    },
    {
      path: "/showcase",
      name: "showcase",
      component: ShowcaseScene,
    },
  ],
});

export default router;
