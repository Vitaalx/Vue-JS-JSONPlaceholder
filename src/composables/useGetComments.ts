import { ref } from "vue";
import { Comment } from "../types/comment"; 
import { commentCollectionSchema } from "../schemas/comment";

export function useGetComments() {
    const comments = ref<Comment[]>([]);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(true);
    const abortController = new AbortController();

    async function getComments(postId: string | null = null) {
        let baseUrl = "https://jsonplaceholder.typicode.com/comments";
        if (postId) {
            baseUrl += `?postId=${postId}`;
        }
        return fetch(
            baseUrl,
            { signal: abortController.signal }
        )
        .then(data => data.json())
        .then(json => commentCollectionSchema.parse(json))
        .then(commentsParsed => {
            comments.value = commentsParsed;
        })
        .catch(error => error.value = error.message)
        .finally( () => loading.value = false)
    }

    return { 
        comments,
        getComments,
        error,
        loading,
        abortController
    };
}