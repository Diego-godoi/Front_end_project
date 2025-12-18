import { HOME_VIEW, USER_CREATE_VIEW, USER_DETAIL_VIEW, USER_UPDATE_VIEW } from "@/constants/appConstants";
import UserCreatePage from "@/pages/UserCreatePage.vue";
import UserDetailsPage from "@/pages/UserDetailsPage.vue";
import UsersOverviewPage from "@/pages/UsersOverviewPage.vue";
import UserUpdatePage from "@/pages/UserUpdatePage.vue";
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
        props: true
      },
      {
        path: 'new-user',
        name: USER_CREATE_VIEW,
        component: UserCreatePage,
        props: true
      },
      {
        path: 'user/:id',
        name: USER_DETAIL_VIEW,
        component: UserDetailsPage,
        props: true,
      },
      {
        path: 'edit/:id',
        name: USER_UPDATE_VIEW,
        component: UserUpdatePage,
        props: true
      }

    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router