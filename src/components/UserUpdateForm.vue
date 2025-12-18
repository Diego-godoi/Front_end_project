<script setup lang="ts">
import { reactive } from 'vue'
import { MIN_USER_NAME, MIN_USER_PASSWORD } from '@/constants/appConstants'
import type { UpdateUserRequest } from '@/dtos/userDtos'
import { useUserStore } from '@/stores/userStore'
import { useField } from 'vee-validate'

const userStore = useUserStore()

if (!userStore.userToEdit) {
    throw new Error('User to edit not found')
}

const user = userStore.userToEdit
const request = reactive<UpdateUserRequest>({
    id: user.id,
    name: user.name,
    email: user.email,
    password: '',
})

const name = useField<string>('name')
const email = useField<string>('email')
const password = useField<string>('password')

const emit = defineEmits<{
    (e: 'update-user', payload: UpdateUserRequest): void
    (e: 'abort-clicked'): void
}>()

const handleSubmit = () => {
    if ((request.name?.length ?? 0) < MIN_USER_NAME) {
        name.errorMessage.value = 'Name needs to be at least 3 characters'
        return
    }
    if ((request.email?.length ?? 0) < MIN_USER_NAME) {
        email.errorMessage.value = 'Name needs to be at least 3 characters'
        return
    }
    if ((request.password?.length ?? 0) < MIN_USER_PASSWORD) {
        password.errorMessage.value = 'Password needs to be at least  characters'
        return
    }

    emit('update-user', request)
}

const handleReset = () => {
    emit('abort-clicked')
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <v-text-field v-model="request.name" :counter="100" :error-messages="name.errorMessage.value"
            label="Name"></v-text-field>
        <v-text-field v-model="request.email" :counter="100" :error-messages="email.errorMessage.value"
            label="Name"></v-text-field>
        <v-text-field v-model="request.password" :counter="100" :error-messages="password.errorMessage.value"
            label="Name"></v-text-field>
    </form>
</template>