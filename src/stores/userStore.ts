import { defineStore } from "pinia";
import type { UserFetchResponse } from "@/dtos/userDtos";
import { UserState } from "@/dtos/userDtos";


export const useUserStore = defineStore('user', {
    state: () => ({
        userToEdit: Object as UserFetchResponse | unknown,
        selectedUserType: UserState[UserState.OPEN],
    }),
    actions: {
        setUserToEdit(user: UserFetchResponse) {
            this.userToEdit = user;
        },
        setSelectedUserType(userType: string) {
            this.selectedUserType = userType;
        }
    }
})