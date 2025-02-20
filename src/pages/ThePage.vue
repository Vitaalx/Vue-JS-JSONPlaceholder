<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheTable from '../components/TheTable.vue';
import TheLoader from '../components/TheLoader.vue';
import { onUnmounted, watch } from 'vue';
import { useGetCollection } from '../composables/useGetCollection';
import { ZodSchema } from 'zod';

/* 
    Page générique pour afficher une collection de données avec le composant TheTable
*/

interface Props {
    schema: ZodSchema,
    path: string
}

const props = defineProps<Props>();

const route = useRoute();

const { collection, getCollection, loading, abortController, error, title } = useGetCollection();

const fetchCollection = () => {
    const id = route.query.id as string | null;
    getCollection(id, props.schema, props.path);
};

watch(
    () => [route.query.id, props.schema, props.path],
    fetchCollection,
    { immediate: true }
);

onUnmounted(() => {
    abortController.value.abort();
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
            v-else-if="collection"
            :items="collection"
            :title="`Liste des ${title}`"
        />
        <p v-else-if="error">{{ error }}</p>
        <p v-else>Aucune donnée trouvée</p>
    </section>
</template>