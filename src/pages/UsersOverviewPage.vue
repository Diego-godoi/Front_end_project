<script lang="ts" setup>
import { getUsers } from '@/composables/getUsers';
import { useUserNavigation } from '@/composables/useUserNavigation';
import type { UserFetchResponse } from '@/dtos/userDtos';
import router from '@/router';
import { useUserStore } from '@/stores/userStore';



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
    router.push({ name: TASK_DETAIL_VIEW, params: { id: id.toString() } }).then();
};

const navigateToUserUpdateView = (user: UserFetchResponse) => {
    userStore.setUserToEdit(user);
    router.push({ name: TASK_UPDATE_VIEW, params: { id: user.id.toString() } }).then();
};

const deleteUser = (id: number) => {
    console.log("delete clicked");
};

</script>