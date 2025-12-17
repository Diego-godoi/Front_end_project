<script setup lang="ts">
import { ALL_USERS, CLOSED_USERS, OPEN_USERS, USER_CREATE_VIEW } from '@/constants/appConstants';
import router from '@/router';
import { useDisplay } from 'vuetify';

const display = useDisplay()

const isMobileDevice = display.mobile

const drawer = ref(false);

const emit = defineEmits(['user-type-selected', 'logo-clicked']);

const logoClicked = () => {
    emit('logo-clicked');
};

const createUser = () => {
    router.push({ name: USER_CREATE_VIEW }).then();
    drawer.value = false;
};
</script>


<template>
    <v-app-bar flat>
        <v-container class="d-flex align-center justify-center">
            <!-- Logo -->
            <v-app-bar-title>
                <v-img src="../assets/logo.png" max-height="70" max-width="70" @click="logoClicked"></v-img>
            </v-app-bar-title>

            <v-spacer />
            <!-- Menu items for desktop view -->
            <v-btn v-if="!isMobileDevice" class="text-none text-subtitle-1" color="#05B990" size="small"
                variant="outlined" @click="createUser">Create User</v-btn>

            <!-- Hamburger icon for mobile view -->
            <v-app-bar-nav-icon v-if="isMobileDevice" @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-container>
    </v-app-bar>

    <!-- Navigation drawer for mobile view -->
    <v-navigation-drawer v-model="drawer" temporary v-if="isMobileDevice">
        <v-list>
            <v-list-item @click="createUser">
                <v-list-item-title>Create User</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
.selected-link {
    color: green !important;
}
</style>