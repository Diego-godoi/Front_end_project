import { ALL_USERS, HOME_VIEW } from "@/constants/appConstants";
import router from "@/router";

export function useUserNavigation() {
    const navigateToHome = (): void => {
        router.replace({ name: HOME_VIEW }).then();
    };

    const logoClicked = (): void => {
        navigateToHome();
    }

    const navigateToUsersView = (): void => {
        router.replace({ name: ALL_USERS }).then()
    }

    return {
        navigateToHome, logoClicked, navigateToUsersView
    };
}