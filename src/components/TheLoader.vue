<script setup lang="ts">
interface Props {
    abortController: AbortController;
}
defineProps<Props>();
</script>
<template>
    <div class="flex flex-col items-center justify-center gap-4">
        <div class="w-12 h-12 border-[6px] border-gray-400 rounded-full loader"></div>
        <span>Loading...</span>
        <button
            @click="abortController.abort()"
            class="p-2 text-white bg-red-500 rounded-md cursor-pointer hover:bg-red-600"
        >
            Annuler le chargement
        </button>
    </div>
</template>
<style scoped>
    @keyframes loader-rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .loader {
        border-right-color: transparent;
        animation: loader-rotate 1s linear infinite;
    }
</style>