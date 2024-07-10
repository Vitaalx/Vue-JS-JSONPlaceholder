<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheTable from '../components/TheTable.vue';
import { useGetUsers } from '../composables/useGetUsers';

const route = useRoute();

const { users, getUsers, error } = useGetUsers();

const cols = ["ID", "Prénom", "Nom", "Email", "Adresse", "Localisation", "Téléphone", "Site Web", "Entreprise"];

getUsers();
if (route.query.id && route.query.id !== "") {
    getUsers(route.query.id as string);
}

</script>
<template>
    <TheTable 
        :items="users" 
        :cols="cols" 
        title="Liste des utilisateurs"
    />
</template>