import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import store from "../store";

interface User {
  access_token?: string;
  role: string; // Bu qatorni qo'shing
  // boshqa fieldlar...
}
const token = (): string | undefined => {
  return store.state.user?.access_token;
};

// if (window.location.pathname === '/' && store?.state?.user?.role === 'admin') {
//   window.location.href = "/branches";
// }

// const auth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void => {
//   if (!token() && to.path !== '/') {
//     next({ path: "/sign-in" });
//     return;
//   }
//   next();
//   return;
// };

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "not-found",
    component: () => import("../views/NotFound/NotFound.vue"),
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: () => import("../views/SignIn/SignIn.vue"),
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
//   if (to.path === "/") {
//     next("/sign-in");
//   } else {
//     next();
//   }
// });

export default router;