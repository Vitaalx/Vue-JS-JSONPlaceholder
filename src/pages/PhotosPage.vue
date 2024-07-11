<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheTable from '../components/TheTable.vue';
import TheLoader from '../components/TheLoader.vue';
import { useGetPhotos } from '../composables/useGetPhotos';
import { onMounted, watch } from 'vue';

const route = useRoute();

const { photos, getPhotos, loading, abortController } = useGetPhotos();

onMounted(() => {
    if (route.query.id && route.query.id !== "") {
        getPhotos(route.query.id as string);
    } else {
        getPhotos();
    }
});

watch(route, () => {
    if (route.query.id && route.query.id !== "") {
        getPhotos(route.query.id as string);
    } else {
        getPhotos();
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
            :items="photos"
            title="Liste des photos"
        />
    </section>
</template>