<script lang="ts" setup>
import { getUsers } from '@/composables/getUsers';
import { useUserNavigation } from '@/composables/useUserNavigation';
import type { UserFetchResponse } from '@/dtos/userDtos';
import router from '@/router';
import { useUserStore } from '@/stores/userStore';
import UserCard from "@/components/UserCard.vue";
import MainBackground from '@/components/MainBackground.vue';
import Navbar from '@/components/Navbar.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorDialog from '@/components/ErrorDialog.vue';
import { USER_DETAIL_VIEW, USER_UPDATE_VIEW } from '@/constants/appConstants';
import { removeUser } from '@/composables/removeUser'
import UserDeleteDialog from '@/components/UserDeleteDialog.vue';



const { fetchUsers, users, isLoading, isNetworkError, axiosError } = getUsers();
const { logoClicked } = useUserNavigation();
const userStore = useUserStore();
const selectedUserId = ref("");
const isDeleteDialogSelected = ref(false);
const selectedUserName = ref('');


onMounted(() => {
    fetchUsers();
});

const openDeleteDialog = (user: { id: string, name: string }) => {
    selectedUserId.value = user.id;
    selectedUserName.value = user.name
    isDeleteDialogSelected.value = true;
};

const handleCardClicked = (id: string) => {
    router.push({ name: USER_DETAIL_VIEW, params: { id } }).then();
};

const navigateToUserUpdateView = (user: UserFetchResponse) => {
    userStore.setUserToEdit(user);
    router.push({ name: USER_UPDATE_VIEW, params: { id: user.id } }).then();
};

const deleteUser = (id: string) => {
    removeUser(id, isLoading, isNetworkError, axiosError, fetchUsers);
};

</script>

<template>
    <Navbar @logo-clicked="logoClicked" />
    <MainBackground>
        <ErrorDialog :model-value="isNetworkError" :axios-error="axiosError ?? undefined" />

        <UserCard :users="users" @card-clicked="handleCardClicked" @delete-clicked="openDeleteDialog"
            @edit-clicked="navigateToUserUpdateView" />

        <UserDeleteDialog v-model="isDeleteDialogSelected" :userName="selectedUserName.valueOf()"
            @confirm-delete="deleteUser(selectedUserId.valueOf())"></UserDeleteDialog>
        <LoadingSpinner :is-loading="isLoading" />
    </MainBackground>
</template>