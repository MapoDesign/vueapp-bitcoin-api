import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/views/HomePage.vue";
import CriptoDetails from "../components/views/CryptoDetails.vue";
import NotFound from "../components/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/crypto/:id",
    name: "CryptoDetails",
    component: CriptoDetails,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
