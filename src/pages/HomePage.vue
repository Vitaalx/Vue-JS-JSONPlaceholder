<script setup lang="ts">
import { onMounted } from 'vue';
import { useGetCollection } from '../composables/useGetCollection';
import { postCollectionSchema } from '../schemas/post';
import { Post } from '../types/post';

const { collection, getCollection, error } = useGetCollection();

onMounted(() => {
  getCollection(null, postCollectionSchema, "posts");
});
</script>
<template>
    <section class="min-h-screen bg-gray-100">
      <div class="py-20 text-white bg-blue-800">
        <div class="container mx-auto text-center">
          <h2 class="text-4xl font-bold">Bienvenue sur mon projet utilisant {JSON}Placeholder API</h2>
          <p class="mt-4">Ce projet utilise l'API JSONPlaceholder pour afficher des données fictives.</p>
        </div>
      </div>
  
      <main class="container py-10 mx-auto">
        <h3 class="mb-6 text-2xl font-bold">Derniers Posts</h3>
        <div id="posts" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-if="collection"
            class="p-6 bg-white rounded-lg shadow-lg"
            :key="post.id"
            v-for="post in collection.slice(0, 6) as Post[]"
          >
            <RouterLink
              :to="{ name: 'posts', query: { id: post.id } }"
            >
              <h4 class="mb-2 text-xl font-bold">{{ post.title }}</h4>
              <p>{{ post.body }}</p>
            </RouterLink>
          </div>
          <div
            v-else-if="error"
          >
            <p>{{ error }}</p>
          </div>
          <div
            v-else
          >
            <p>Aucun posts.</p>
          </div>
        </div>
      </main>
    </section>
  </template>
  