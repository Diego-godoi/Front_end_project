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



const { fetchUsers, users, isLoading, isNetworkError, axiosError } = getUsers();
const { handleUserTypeSelected, logoClicked } = useUserNavigation();
const userStore = useUserStore();
const selectedUserId = ref(0);
const isDeleteDialogSelected = ref(false);
const selectedUserEmail = ref('');


onMounted(() => {
    fetchUsers(userStore.selectedUserType);
});

watch(() => userStore.selectedUserType, (newType) => {
    fetchUsers(newType);
});

watchEffect(() => {
    fetchUsers(userStore.selectedUserType);
});


const openDeleteDialog = (user: { id: number, email: string }) => {
    selectedUserId.value = user.id;
    selectedUserEmail.value = user.email;
    isDeleteDialogSelected.value = true;
};

const handleCardClicked = (id: number) => {
    router.push({ name: USER_DETAIL_VIEW, params: { id: id.toString() } }).then();
};

const navigateToUserUpdateView = (user: UserFetchResponse) => {
    userStore.setUserToEdit(user);
    router.push({ name: USER_UPDATE_VIEW, params: { id: user.id.toString() } }).then();
};

const deleteUser = (id: number) => {
    console.log("delete clicked");
};

</script>

<template>
    <Navbar @user-type-selected="handleUserTypeSelected" @logo-clicked="logoClicked">
        <MainBackground>
            <ErrorDialog :model-value="isNetworkError" :axios-error="axiosError ?? undefined"></ErrorDialog>
            <UserCard :users="users" @card-clicked="handleCardClicked" @delete-clicked="openDeleteDialog"
                @edit-clicked="navigateToUserUpdateView"></UserCard>
            <LoadingSpinner :is-loading="isLoading"></LoadingSpinner>
        </MainBackground>
    </Navbar>
</template>