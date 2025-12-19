<script setup lang="ts">
import type { UserFetchResponse } from '@/dtos/userDtos';
import { useUserStore } from '@/stores/userStore';

const props = defineProps<{
    users: UserFetchResponse[]
}>()

const userStore = useUserStore();
const emits = defineEmits(['card-clicked', 'delete-clicked', 'edit-clicked'])

function storeUser(user: UserFetchResponse) {
    userStore.setUserToEdit(user);
    emits('card-clicked', user.id)
}
</script>

<template>
    <p class="center-content" v-if="users?.length === 0">No users have been created yet...</p>
    <div v-if="users?.length > 0">
        <v-card v-for="(user, index) in users" :key="index" class="mx-auto v-card-bg nice-looking-card">
            <v-card-item @click="storeUser(user)">
                <div>
                    <div class="text-h6 mb-2 center-text">
                        {{ user.name }}
                    </div>
                    <div class="text-caption center-text">{{ user.email }}</div>
                </div>
            </v-card-item>

            <v-card-actions>
                <v-btn color="blue" class="mr-2" @click="emits('edit-clicked', user)">
                    <v-icon start icon="mdi-pencil-outline"></v-icon>
                    Edit User
                </v-btn>

                <v-btn color="red" class="ml-auto"
                    @click="emits('delete-clicked', { id: user.id, name: user.name })">
                    Delete User
                    <v-icon end icon="mdi-trash-can-outline"></v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<style scoped>
.center-text {
    text-align: center;
}

.black-border {
    border: 2px solid black
}

.green-border {
    border: 2px solid green;
}

.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
}
</style>