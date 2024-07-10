<script setup lang="ts">
import { computed } from 'vue';
import { flattenObject } from '../utils/flatObject';

interface Props {
    title?: string;
    items: object[];
    cols: string[],
}
const props = defineProps<Props>();

const links = {
    "postId": "posts",
    "userId": "users",
    "albumId": "albums",
    "commentId": "comments",
}

const itemsFlatted = computed(() => {
    return props.items.map(item => flattenObject(item))
});

const objectKeys = computed(() => {
    if (props.items.length > 0) {
        console.log(Object.keys(itemsFlatted.value[0]));
        return Object.keys(itemsFlatted.value[0])
    }
});
</script>
<template>
    <table>
        <thead class="bg-slate-100">
            <tr>
                <th 
                    v-for="(col, index) in objectKeys"
                    :key="index"
                    class="p-2 text-sm font-semibold text-left uppercase"
                >
                    {{ col }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr 
                v-for="(item, index) in itemsFlatted"
                :key="index"
            >
                <td
                    v-for="(key, index) in objectKeys"
                    :key="index"
                    class="p-2 text-sm font-normal text-left"
                >
                    <RouterLink
                        v-if="key in links"
                        :to="{ name: links[key], query: { id: item[key] } }"
                    >
                        {{ item[key as keyof object] }}
                    </RouterLink>
                    <span
                        v-else
                    >
                        {{ item[key as keyof object] }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>