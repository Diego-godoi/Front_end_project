<script setup lang="ts">
import { watchEffect } from "vue";
import type { UpdateUserRequest } from "@/dtos/userDtos";
import { useUserStore } from "@/stores/userStore";
import { useField, useForm } from "vee-validate";
import { editUserSchema } from "@/composables/userValidation";

const userStore = useUserStore();

const emit = defineEmits<{
    (e: "update-user", payload: UpdateUserRequest): void;
    (e: "abort-clicked"): void;
}>();

const { handleSubmit, setValues } = useForm<UpdateUserRequest>({
    validationSchema: editUserSchema,
});

const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } = useField<string>("password");

const submit = handleSubmit((values) => {
    emit("update-user", values);
});

const handleReset = () => {
    emit("abort-clicked");
};

watchEffect(() => {
    if (userStore.userToEdit) {
        setValues({
            id: userStore.userToEdit.id,
            name: userStore.userToEdit.name,
            email: userStore.userToEdit.email,
            password: '',
        });
    }
});
</script>

<template>
    <form @submit.prevent="submit">
        <v-text-field v-model="name" :counter="100" :error-messages="nameError" label="Name"></v-text-field>

        <v-text-field v-model="email" :counter="100" :error-messages="emailError" label="email"></v-text-field>

        <v-text-field v-model="password" :counter="100" :error-messages="passwordError" label="Password"></v-text-field>

        <v-btn class="mb-4 clear-btn" @click="handleReset">abort</v-btn>

        <v-btn class="mb-4 submit-btn" type="submit">update</v-btn>
    </form>
</template>
