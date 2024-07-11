<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheTable from '../components/TheTable.vue';
import TheLoader from '../components/TheLoader.vue';
import { useGetTodos } from '../composables/useGetTodos';
import { onMounted, watch } from 'vue';

const route = useRoute();

const { todos, getTodos, loading, abortController } = useGetTodos();

onMounted(() => {
    if (route.query.id && route.query.id !== "") {
        getTodos(route.query.id as string);
    } else {
        getTodos();
    }
});

watch(route, () => {
    if (route.query.id && route.query.id !== "") {
        getTodos(route.query.id as string);
    } else {
        getTodos();
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
            :items="todos"
            title="Liste des todos"
        />
    </section>
</template>