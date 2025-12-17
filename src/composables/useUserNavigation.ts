import { ALL_USERS, CLOSED_USERS, HOME_VIEW, OPEN_USERS } from "@/constants/appConstants";
import router from "@/router";

export function useUserNavigation() {
    const navigateToHome = (): void => {
        router.replace({ name: HOME_VIEW }).then();
    };

    const logoClicked = (): void => {
        navigateToHome();
    }

    return {
        navigateToHome, logoClicked,
    };
}