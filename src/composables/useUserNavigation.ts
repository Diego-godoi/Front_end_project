import { ALL_USERS, CLOSED_USERS, HOME_VIEW, OPEN_USERS } from "@/constants/appConstants";
import { UserState } from "@/dtos/userDtos";
import { useUserStore } from "@/stores/userStore";
import router from "@/router";

export function useUserNavigation() {
    const userStore = useUserStore();

    const handleUserTypeSelected = (userType: string): void => {
        switch (userType) {
            case OPEN_USERS:
                userStore.selectedUserType = UserState[UserState.OPEN];
                break;
            case CLOSED_USERS:
                userStore.selectedUserType = UserState[UserState.CLOSED];
                break;
            case ALL_USERS:
                userStore.selectedUserType = '';
                break;
        }
        navigateToUserView();
    }

    const navigateToUserView = (): void => {
        router.replace({ name: HOME_VIEW }).then();
    };

    const logoClicked = (): void => {
        userStore.selectedUserType = UserState[UserState.OPEN];
        router.replace({ name: HOME_VIEW }).then();
    };

    return {
        handleUserTypeSelected, navigateToUserView, logoClicked,
    };
}