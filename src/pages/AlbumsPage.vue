<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheTable from '../components/TheTable.vue';
import TheLoader from '../components/TheLoader.vue';
import { useGetAlbums } from '../composables/useGetAlbums';
import { onMounted, watch } from 'vue';

const route = useRoute();

const { albums, getAlbums, loading, abortController } = useGetAlbums();

onMounted(() => {
    if (route.query.id && route.query.id !== "") {
        getAlbums(route.query.id as string);
    } else {
        getAlbums();
    }
});

watch(route, () => {
    if (route.query.id && route.query.id !== "") {
        getAlbums(route.query.id as string);
    } else {
        getAlbums();
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
            :items="albums"
            title="Liste des albums"
        />
   </section>
</template>