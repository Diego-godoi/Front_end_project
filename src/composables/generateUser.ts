import type { CreateUserRequest } from "@/dtos/userDtos";
import { userService } from "@/services/userApi";
import { AxiosError } from "axios";
import type { Ref } from "vue";
import logRequestError from "./logRequestError";

export async function generateUser(request: CreateUserRequest,
    isLoading: Ref<boolean>,
    isNetworkError: Ref<boolean>,
    axiosError: Ref<AxiosError | unknown>,
): Promise<void> {
    isLoading.value = true;
    isNetworkError.value = false;
    await userService.createUser(request).then(() => {
        isLoading.value = false;
    }).catch((err: AxiosError | unknown) => {
        logRequestError('createNewUser', err);
        axiosError.value = err instanceof AxiosError ? err : undefined;
        isNetworkError.value = true;
    }).finally(() => {
        isLoading.value = false;
    })
}