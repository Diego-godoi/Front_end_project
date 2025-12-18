import type { UpdateUserRequest } from "@/dtos/userDtos";
import { userService } from "@/services/userApi";
import { AxiosError } from "axios";
import type { Ref } from "vue";
import logRequestError from "./logRequestError";

export async function editUser(request: UpdateUserRequest,
    isLoading: Ref<boolean>,
    isNetworkError: Ref<boolean>,
    axiosError: Ref<AxiosError | unknown>,
    navigateToUserView: () => void): Promise<void> {


    isLoading.value = true
    isNetworkError.value = false
    await userService.updateUser(request)
        .then(() => {
            isLoading.value = false
            navigateToUserView();
        })
        .catch((err: AxiosError | unknown) => {
            logRequestError('updateUser', err)
            axiosError.value = err instanceof AxiosError ? err : undefined
            isNetworkError.value = true;
        })
        .finally(() => {
            isLoading.value = false;
        })
}