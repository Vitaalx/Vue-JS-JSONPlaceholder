<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheTable from '../components/TheTable.vue';
import { useGetPosts } from '../composables/useGetPosts';

const route = useRoute();

const { posts, getPosts, error } = useGetPosts();

const cols = ["UserId", "ID", "Title", "Body"];

getPosts();
if (route.query.id && route.query.id !== "") {
    getUsers(route.query.id as string);
}

</script>
<template>
    <TheTable 
        :items="posts" 
        :cols="cols" 
        title="Liste des posts"
    />
</template>