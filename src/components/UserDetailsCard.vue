<script setup lang="ts">
import type { UserFetchResponse } from '@/dtos/userDtos';

defineProps({
    user: Object as PropType<UserFetchResponse>
});
const emit = defineEmits(['back-clicked'])
const handleBackClick = () => {
    emit('back-clicked')
}
</script>

<template>
    <v-card class="mx-auto center-card-text">
        <v-list lines="two">
            <v-list-subheader>User Detail</v-list-subheader>

            <v-list-item>
                <template v-slot:subtitle>
                    <span class="font-weight-bold">User ID: </span>{{ user?.id }}
                </template>
            </v-list-item>
            <v-divider inset></v-divider>

            <v-list-item>
                <template v-slot:subtitle>
                    <span class="font-weight-bold">Name: </span>{{ user?.name }}
                </template>
            </v-list-item>
            <v-divider inset></v-divider>

            <v-list-item>
                <template v-slot:subtitle>
                    <span class="font-weight-bold">Email: </span>{{ user?.email }}
                </template>
            </v-list-item>
            <v-divider inset></v-divider>
        </v-list>
    </v-card>

    <v-btn block class="clear-btn" @click="handleBackClick">back</v-btn>
</template>

<style scoped>
.center-card-text {
    text-align: center;
}
</style>