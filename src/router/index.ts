import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../pages/HomePage.vue'),
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
    },
    {
      path: "/albums",
      name: "albums",
      component: () => import('../pages/AlbumsPage.vue')
    },
    {
      path: "/photos",
      name: "photos",
      component: () => import('../pages/PhotosPage.vue')
    },
    {
      path: "/comments",
      name: "comments",
      component: () => import('../pages/CommentsPage.vue')
    },
    {
      path: "/todos",
      name: "todos",
      component: () => import('../pages/TodosPage.vue')
    }
  ]
})

export default router