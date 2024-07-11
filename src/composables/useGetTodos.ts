import { ref } from "vue";
import { Todo } from "../types/todo";
import { todoCollectionSchema } from "../schemas/todo";

export function useGetTodos() {
    const todos = ref<Todo[]>([]);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(true);
    const abortController = new AbortController();

    function getTodos(userId: string | null = null) {
        let baseUrl = "https://jsonplaceholder.typicode.com/todos";
        if (userId) {
            baseUrl += `?userId=${userId}`;
        }
        return fetch(
            baseUrl,
            { signal: abortController.signal }
        )
        .then(data => data.json())
        .then(json => todoCollectionSchema.parse(json))
        .then(todosParsed => {
            todos.value = todosParsed;
        })
        .catch(error => error.value = error.message)
        .finally( () => loading.value = false)
    }

    return { 
        todos,
        getTodos,
        error,
        loading,
        abortController
    };
}