import { ref } from "vue";
import { Post } from "../types/post";
import { postCollectionSchema } from "../schemas/post";

export function useGetPosts() {
    const posts = ref<Post[]>([]);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(true);
    const abortController = new AbortController();

    async function getPosts(postId: string | null = null) {
        let baseUrl = "https://jsonplaceholder.typicode.com/posts";
        if (postId) {
            baseUrl += `?id=${postId}`;
        }
        return fetch(
            baseUrl,
            { signal: abortController.signal }
        )
        .then(data => data.json())
        .then(json => postCollectionSchema.parse(json))
        .then(postsParsed => {
            posts.value = postsParsed;
        })
        .catch(error => error.value = error.message)
        .finally( () => loading.value = false)
    }

    return { 
        posts,
        getPosts,
        error,
        loading,
        abortController
    };
}