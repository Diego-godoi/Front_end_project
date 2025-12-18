<script setup lang="ts">
import { useUserNavigation } from '@/composables/useUserNavigation';
import type { UserFetchResponse } from '@/dtos/userDtos';
import router from '@/router';
import { useUserStore } from '@/stores/userStore';
import UserDetailsCard from '@/components/UserDetailsCard.vue';

defineProps({
    id: String
});

const user = reactive<UserFetchResponse>({
    id: '',
    name: '',
    email: '',
})


const { logoClicked } = useUserNavigation();
const userStore = useUserStore();

onMounted(showUserDetails);

function showUserDetails() {
    Object.assign(user, userStore.userToEdit)
}

const clickedBackButton = () => {
    router.back();
}

</script>

<template>
    <Navbar @logo-clicked="logoClicked"></Navbar>
    <MainBackground>
        <UserDetailsCard :user="user" @back-clicked="clickedBackButton"></UserDetailsCard>
    </MainBackground>
</template>