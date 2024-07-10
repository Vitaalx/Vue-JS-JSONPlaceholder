import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../App.vue'),
    },
    {
        path: '/users',
        name: "users",
        component: () => import('../pages/UsersPage.vue')
    },
    {
      path: '/posts',
      name: "posts",
      component: () => import('../pages/PostsPage.vue')
    }
  ]
})

export default router