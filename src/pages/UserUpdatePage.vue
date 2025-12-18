<script setup lang="ts">
import { editUser } from '@/composables/EditUser';
import { useUserNavigation } from '@/composables/useUserNavigation';
import type { UpdateUserRequest } from '@/dtos/userDtos';
import { AxiosError } from 'axios';
import Navbar from '@/components/Navbar.vue';
import MainBackground from '@/components/MainBackground.vue';
import UserUpdateForm from '@/components/UserUpdateForm.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorDialog from '@/components/ErrorDialog.vue';
import router from '@/router';

defineProps({
    id: {
        type: String,
        required: true
    }
})

const { logoClicked, navigateToUsersView } = useUserNavigation();
const isLoading = ref(false)
const isNetworkError = ref(false)
const axiosError = ref<AxiosError>();

const clickedAbort = () => {
    router.back();
}

const updateUser = (request: UpdateUserRequest) => {
    editUser(request, isLoading, isNetworkError, axiosError, navigateToUsersView)
}
</script>

<template>
    <Navbar @logoClicked="logoClicked"></Navbar>
    <MainBackground>
        <UserUpdateForm @update-user="updateUser" @abort-clicked="clickedAbort" />
        <LoadingSpinner :is-loading="isLoading"></LoadingSpinner>
        <ErrorDialog :model-value="isNetworkError && !!axiosError" :axios-error="axiosError"></ErrorDialog>
    </MainBackground>
</template>