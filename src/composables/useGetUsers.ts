import { ref } from "vue";
import { User } from "../types/User";
import { userCollectionSchema } from "../schemas/user";

export function useGetUsers() {
    const users = ref<User[]>([]);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(true);
    const abortController = new AbortController();

    async function getUsers(userId: string | null = null) {
        let baseUrl = "https://jsonplaceholder.typicode.com/users";
        if (userId) {
            baseUrl += `?id=${userId}`;
        }
        return fetch(
            baseUrl,
            { signal: abortController.signal }
        )
        .then(data => data.json())
        .then(json => userCollectionSchema.parse(json))
        .then(usersParsed => {
            users.value = usersParsed;
        })
        .catch(error => error.value = error.message)
        .finally( () => loading.value = false)
    }

    return { 
        users,
        getUsers,
        error,
        loading
    };
}