import { defineStore } from "pinia";
import type { UserFetchResponse } from "@/dtos/userDtos";

interface UserState {
    userToEdit: UserFetchResponse | null
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        userToEdit: null,
    }),
    actions: {
        setUserToEdit(user: UserFetchResponse) {
            this.userToEdit = user;
        },
        clearUserToEdit() {
            this.userToEdit = null;
        },
    }
})