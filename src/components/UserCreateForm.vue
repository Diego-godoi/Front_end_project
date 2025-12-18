<script setup lang="ts">
import { MIN_USER_NAME, MIN_USER_PASSWORD } from '@/constants/appConstants'
import type { CreateUserRequest } from '@/dtos/userDtos'
import { useField, useForm } from 'vee-validate'

const emit = defineEmits<{
    (e: 'create-new-user', payload: CreateUserRequest): void
}>()

const { handleSubmit, handleReset } = useForm<CreateUserRequest>({
    validationSchema: {
        name(value: string) {
            if (value?.length >= MIN_USER_NAME) return true
            return 'Name needs to be at least 5 characters'
        },
        email(value: string) {
            if (value?.includes('@')) return true
            return 'Email addresses must include the @ symbol'
        },
        password(value: string) {
            if (value?.length >= MIN_USER_PASSWORD) return true
            return 'Password needs to be at least 5 characters.'
        },
    },
})

const email = useField<string>('email')
const name = useField<string>('name')
const password = useField<string>('password')

const submit = handleSubmit((values) => {
    emit('create-new-user', values)
})
</script>

<template>
    <form @submit.prevent="submit">
        <v-text-field v-model="name.value.value" :counter="100" :error-messages="name.errorMessage.value"
            label="Name"></v-text-field>
        <v-text-field v-model="email.value.value" :counter="100" :error-messages="email.errorMessage.value"
            label="Email"></v-text-field>
        <v-text-field v-model="password.value.value" :counter="100" :error-messages="password.errorMessage.value"
            label="Password"></v-text-field>

        <v-btn class="mb-4 clear-btn" @click="handleReset">clear</v-btn>

        <v-btn class="mb-4 submit-btn" type="submit"> submit</v-btn>
    </form>
</template>
