<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheTable from '../components/TheTable.vue';
import TheLoader from '../components/TheLoader.vue';
import { useGetPosts } from '../composables/useGetPosts';
import { onMounted, watch } from 'vue';

const route = useRoute();

const { posts, getPosts, loading, abortController } = useGetPosts();

onMounted(() => {
    if (route.query.id && route.query.id !== "") {
        getPosts(route.query.id as string);
    } else {
        getPosts();
    }
});

watch(route, () => {
    if (route.query.id && route.query.id !== "") {
        getPosts(route.query.id as string);
    } else {
        getPosts();
    }
});

</script>
<template>
    <section
        class="flex flex-col min-h-screen"
        :class="loading ? 'justify-center' : 'justify-start'"
    >
        <TheLoader 
            v-if="loading"
            :abort-controller="abortController"
        />
        <TheTable
            v-else
            :items="posts"
            title="Liste des posts"
        />
    </section>
</template>