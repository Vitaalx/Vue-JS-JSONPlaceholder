<script setup lang="ts">
import { computed } from 'vue';
import { flattenObject } from '../utils/flatObject';

interface Props {
    title?: string;
    items: object[];
}
const props = defineProps<Props>();

const linksRefs = {
    postId: "posts",
    userId: "users",
    albumId: "albums",
    commentId: "comments",
}

const imgsRefs = {
    url: "photos",
}

const itemsFlatted = computed(() => {
    return props.items.map(item => flattenObject(item))
});

const objectKeys = computed(() => {
    if (props.items.length > 0) {
        return Object.keys(itemsFlatted.value[0])
    }
});
</script>
<template>
    <h1
     class="p-2 text-lg font-semibold text-center uppercase bg-slate-200"
    >
        {{ title }}
    </h1>
    <table class="w-full min-h-full">
        <thead class="bg-slate-200">
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
                        v-if="key in linksRefs"
                        :to="{ name: linksRefs[key as keyof object], query: { id: item[key as keyof object] } }"
                        class="font-bold text-blue-500 hover:underline"
                    >
                        {{ item[key as keyof object] }}
                    </RouterLink>
                    <img
                        v-else-if="key in imgsRefs"
                        :src="item[key as keyof object]"
                        :alt="item[key as keyof object]"
                        class="object-cover w-10 h-10 rounded-lg"
                    />
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