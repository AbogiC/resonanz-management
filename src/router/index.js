import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import SheetMusic from "../views/SheetMusic.vue";
import Users from "../views/Users.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/sheet-music",
    name: "SheetMusic",
    component: SheetMusic,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
