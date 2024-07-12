import { ref } from "vue";
import { ZodSchema } from "zod";

/* 
    Permet de récupérer une collection de données depuis l'API JSONPlaceholder
    en fonction du path passé en paramètre et du schéma de validation Zod
    envoyé en paramètre de la fonction getCollection.
*/
export function useGetCollection() {
    const collection = ref([]);
    const title = ref('');
    const error = ref(null);
    const loading = ref(false);
    let abortController = ref(new AbortController());

    const getCollection = async (id: string | null = null, schema: ZodSchema, path: string) => {        
        if (abortController.value) {
            abortController.value = new AbortController();
        }

        loading.value = true;
        error.value = null;
        let baseUrl = `https://jsonplaceholder.typicode.com/${path}`;

        if (id) {
            baseUrl += `?id=${id}`;
        }
        return fetch(
            baseUrl,
            { signal: abortController.value.signal }
        )
        .then(data => data.json())
        .then(json => schema.parse(json))
        .then(parsedCollection => {
            collection.value = parsedCollection;
            title.value = path.charAt(0).toUpperCase() + path.slice(1);
        })
        .catch(error => error.value = error.message)
        .finally(() => loading.value = false)
    }

    return { 
        collection,
        getCollection,
        error,
        loading,
        abortController,
        title
    };
}