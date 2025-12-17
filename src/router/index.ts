import { HOME_VIEW, USER_CREATE_VIEW, USER_DETAIL_VIEW, USER_UPDATE_VIEW } from "@/constants/appConstants";
import UsersOverviewPage from "@/pages/UsersOverviewPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: HOME_VIEW,
        component: UsersOverviewPage,
      },

    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router