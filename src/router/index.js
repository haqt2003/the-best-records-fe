import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import getToken from "@/composables/getToken";

const requireAuth = (to, from, next) => {
  const user = getToken();
  if (!user) next({ name: "login", params: {} });
  else next();
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductsView.vue"),
  },
  {
    path: "/products/:id",
    name: "productdetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductDetails.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CartView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/user-info",
    name: "userinfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserInfo.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Settings.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "login",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignupView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
