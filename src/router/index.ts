import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/subscribers",
    name: "View All",
    component: () =>
      import(
        /* webpackChunkName: "view-all" */ "../views/ViewAllSubscribers.vue"
      ),
  },
  {
    path: "/subscribers/edit/:subscriberId",
    name: "Edit",
    component: () =>
      import(/* webpackChunkName: "edit-one" */ "../views/EditSubscriber.vue"),
  },
  {
    path: "/subscribers/add",
    name: "Add",
    component: () =>
      import(/* webpackChunkName: "add-one" */ "../views/AddSubscriber.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "Not Found",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
