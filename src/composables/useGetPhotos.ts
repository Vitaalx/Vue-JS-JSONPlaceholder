import { ref } from "vue";
import { Photo } from "../types/photo";
import { photoCollectionSchema } from "../schemas/photo";

export function useGetPhotos() {
    const photos = ref<Photo[]>([]);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(true);
    const abortController = new AbortController();

    async function getPhotos(albumId: string | null = null) {
        let baseUrl = "https://jsonplaceholder.typicode.com/photos";
        if (albumId) {
            baseUrl += `?albumId=${albumId}`;
        }
        return fetch(
            baseUrl,
            { signal: abortController.signal }
        )
        .then(data => data.json())
        .then(json => photoCollectionSchema.parse(json))
        .then(photosParsed => {
            photos.value = photosParsed;
        })
        .catch(error => error.value = error.message)
        .finally( () => loading.value = false)
    }

    return { 
        photos,
        getPhotos,
        error,
        loading,
        abortController
    };
}