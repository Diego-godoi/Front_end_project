import { defineStore } from "pinia";
import type { UserFetchResponse } from "@/dtos/userDtos";


export const useUserStore = defineStore('user', {
    state: () => ({
        userToEdit: Object as UserFetchResponse | unknown,
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