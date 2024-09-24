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
    path: "/info-order",
    name: "infooder",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/InfoOrder.vue"),
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
    path: "/history",
    name: "history",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HistoryOrder.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "login",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ForgotPassword.vue"),
  },
  {
    path: "/confirm-code",
    name: "confirmCode",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ConfirmCode.vue"),
  },
  {
    path: "/new-password",
    name: "newPassword",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NewPassword.vue"),
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
