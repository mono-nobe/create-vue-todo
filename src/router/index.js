import { createRouter, createWebHistory } from "vue-router";
import TodoView from "../views/TodoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "todos",
      component: TodoView,
    },
  ],
});

export default router;
