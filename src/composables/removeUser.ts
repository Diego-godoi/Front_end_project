import { userService } from "@/services/userApi";
import { AxiosError } from "axios";
import type { Ref } from "vue";
import logRequestError from "./logRequestError";

export async function removeUser(id: string, isLoading: Ref<boolean>, isNetworkError: Ref<boolean>, axiosError: Ref<boolean | unknown>, fetchUsers: () => Promise<void>) {

    try {
        isLoading.value = true;
        isNetworkError.value = false;
        axiosError.value = null;

        await userService.deleteUser(id);
        fetchUsers();
    } catch (err: AxiosError | unknown) {
        logRequestError('removeUser', err);
        axiosError.value = err instanceof AxiosError ? err : undefined;
        isNetworkError.value = true;
    } finally {
        isLoading.value = false;
    }
}