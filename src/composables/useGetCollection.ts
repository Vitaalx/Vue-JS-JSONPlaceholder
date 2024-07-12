import { ref } from "vue";
import { ZodSchema } from "zod";

export function useGetCollection() {
    const collection = ref([]);
    const error = ref(null);
    const loading = ref(false);
    const abortController = new AbortController();

    const getCollection = async (id: string | null, schema: ZodSchema, path: string) => {
        let baseUrl = `https://jsonplaceholder.typicode.com/${path}`;
        loading.value = true;
        error.value = null;
        if (id) {
            baseUrl += `?id=${id}`;
        }
        return fetch(
            baseUrl,
            { signal: abortController.signal }
        )
        .then(data => data.json())
        .then(json => schema.parse(json))
        .then(parsedCollection => {
            collection.value = parsedCollection;
        })
        .catch(error => error.value = error.message)
        .finally(() => loading.value = false)
    }

    return { 
        collection,
        getCollection,
        error,
        loading,
        abortController
    };
}