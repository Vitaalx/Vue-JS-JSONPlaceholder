<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheTable from '../components/TheTable.vue';
import TheLoader from '../components/TheLoader.vue';
import { useGetComments } from '../composables/useGetComments';
import { onMounted, watch } from 'vue';

const route = useRoute();

const { comments, getComments, loading, abortController } = useGetComments();

onMounted(() => {
    if (route.query.id && route.query.id !== "") {
        getComments(route.query.id as string);
    } else {
        getComments();
    }
});

watch(route, () => {
    if (route.query.id && route.query.id !== "") {
        getComments(route.query.id as string);
    } else {
        getComments();
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
            :items="comments"
            title="Liste des commentaires"
        />
    </section>
</template>