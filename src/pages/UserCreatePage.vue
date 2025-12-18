<script setup lang="ts">
import { generateUser } from '@/composables/generateUser';
import { useUserNavigation } from '@/composables/useUserNavigation';
import type { CreateUserRequest } from '@/dtos/userDtos';
import { AxiosError } from 'axios';
import UserCreateForm from '@/components/UserCreateForm.vue';

const { logoClicked } = useUserNavigation();

const isLoading = ref(false);
const isNetworkError = ref(false);
const axiosError = ref<AxiosError>();

const createForm = ref<InstanceType<typeof UserCreateForm>>()

const createUser = (request: CreateUserRequest) => {
    generateUser(request, isLoading, isNetworkError, axiosError);
    createForm?.value?.resetForm()
}
</script>

<template>
    <Navbar @logo-clicked="logoClicked"></Navbar>
    <MainBackground>
        <UserCreateForm ref="createForm" @create-new-user="createUser"></UserCreateForm>
        <LoadingSpinner :is-loading="isLoading"></LoadingSpinner>
        <ErrorDialog :model-value="isNetworkError" :axios-error="axiosError"></ErrorDialog>
    </MainBackground>
</template>