import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { ZodSchema } from 'zod';
import { userCollectionSchema } from '../schemas/user';
import { postCollectionSchema } from '../schemas/post';
import { albumCollectionSchema } from '../schemas/album';
import { photoCollectionSchema } from '../schemas/photo';
import { commentCollectionSchema } from '../schemas/comment';
import { todoCollectionSchema } from '../schemas/todo';

interface PageProps {
  name: string;
  pageComponent: string;
  schema: ZodSchema;
}

const pageProps: PageProps[] = [
  {
    name: 'users',
    pageComponent: 'ThePage',
    schema: userCollectionSchema,
  },
  {
    name: 'posts',
    pageComponent: 'ThePage',
    schema: postCollectionSchema,
  },
  {
    name: 'albums',
    pageComponent: 'ThePage',
    schema: albumCollectionSchema,
  },
  {
    name: 'photos',
    pageComponent: 'ThePage',
    schema: photoCollectionSchema,
  },
  {
    name: 'comments',
    pageComponent: 'ThePage',
    schema: commentCollectionSchema,
  },
  {
    name: 'todos',
    pageComponent: 'ThePage',
    schema: todoCollectionSchema,
  },
];

function createGenericPageRoute(name: string, schema: ZodSchema, pageComponent: string): RouteRecordRaw {
  return {
    path: `/${name}`,
    name: name,
    component: () => import(`../pages/${pageComponent}.vue`),
    props: { schema, path: name }
  };
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../pages/HomePage.vue')
  },
  ...pageProps.map((page) => createGenericPageRoute(page.name, page.schema, page.pageComponent)),
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
