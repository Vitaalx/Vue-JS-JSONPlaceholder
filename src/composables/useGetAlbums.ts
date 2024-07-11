import { ref } from "vue";
import { Album } from "../types/album";
import { albumCollectionSchema } from "../schemas/album";

export function useGetAlbums() {
    const albums = ref<Album[]>([]);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(true);
    const abortController = new AbortController();

    function getAlbums(albumId: string | null = null) {
        let baseUrl = "https://jsonplaceholder.typicode.com/albums";
        if (albumId) {
            baseUrl += `?id=${albumId}`;
        }
        return fetch(
            baseUrl,
            { signal: abortController.signal }
        )
        .then(data => data.json())
        .then(json => albumCollectionSchema.parse(json))
        .then(albumsParsed => {
            albums.value = albumsParsed;
        })
        .catch(error => error.value = error.message)
        .finally(() => loading.value = false)
    }

    return { 
        albums,
        getAlbums,
        error,
        loading,
        abortController
    };
}