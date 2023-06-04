import { createRouter, createWebHistory } from "vue-router";
import Game from "../views/Game.vue";
import About from "../views/About.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Game,
    },
    {
      path: "/about",
      component: About,
    },
  ],
});

export default router;
