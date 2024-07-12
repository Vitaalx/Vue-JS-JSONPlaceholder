<script setup>
import { ref, onMounted } from 'vue';

const posts = ref([]);

onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      posts.value = data.slice(0, 6);
    });
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
            v-for="post in posts"
            :key="post.id"
            class="p-6 bg-white rounded-lg shadow-lg"
          >
            <RouterLink
              :to="{ name: 'posts', query: { id: post.id } }"
            >
              <h4 class="mb-2 text-xl font-bold">{{ post.title }}</h4>
              <p>{{ post.body }}</p>
            </RouterLink>
          </div>
        </div>
      </main>
    </section>
  </template>
  