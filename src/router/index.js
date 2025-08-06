import { createRouter, createWebHistory } from "vue-router";
import CountdownScene from "../views/scenes/CountdownScene.vue";
import GeneralMappoolScene from "@/views/scenes/GeneralMappoolScene.vue";
import ShowcaseScene from "@/views/scenes/ShowcaseScene.vue";
import BanpickScene from "@/views/scenes/BanpickScene.vue";
import MatchOverviewScene from "@/views/scenes/MatchOverviewScene.vue";
import GameplayScene from "@/views/scenes/GameplayScene.vue";
import MatchupScene from "@/views/scenes/MatchupScene.vue";
import QualsResultsScene from "@/views/scenes/QualsResultsScene.vue";
import MatchSchedulesScene from "@/views/scenes/MatchSchedulesScene.vue";
import BracketsScene from "@/views/scenes/BracketsScene.vue";
import OiiResultsScene from "@/views/scenes/OiiResultsScene.vue";

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
    {
      path: "/banpick",
      name: "banpick",
      component: BanpickScene,
    },
    {
      path: "/matchoverview",
      name: "matchoverview",
      component: MatchOverviewScene,
    },
    {
      path: "/gameplay",
      name: "gameplay",
      component: GameplayScene,
    },
    {
      path: "/matchup",
      name: "matchup",
      component: MatchupScene,
    },
    {
      path: "/qresults",
      name: "qresults",
      component: QualsResultsScene,
    },
    {
      path: "/schedules",
      name: "schedules",
      component: MatchSchedulesScene,
    },
    {
      path: "/brackets",
      name: "brackets",
      component: BracketsScene,
    },
    {
      path: "/oiiresults",
      name: "oiiresults",
      component: OiiResultsScene,
    },
  ],
});

export default router;
