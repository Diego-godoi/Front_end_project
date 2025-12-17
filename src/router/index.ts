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
      {
        path: '/user/create',
        name: USER_CREATE_VIEW,
        component: () => import('@/pages/UserCreatePage.vue'),
      },
      {
        path: '/user/:id',
        name: USER_DETAIL_VIEW,
        component: () => import('@/pages/UserDetailPage.vue'),
      },
      {
        path: '/user/:id/edit',
        name: USER_UPDATE_VIEW,
        component: () => import('@/pages/UserUpdatePage.vue'),
      }

    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router