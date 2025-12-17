import type { UserFetchResponse } from "@/dtos/userDtos";
import { userService } from "@/services/userApi";
import axios, { type AxiosError } from "axios";
import logRequestError from "./logRequestError";
import { ref, type Ref } from "vue";

interface UsersFetchState {
    fetchUsers: () => Promise<void>;
    users: Ref<UserFetchResponse[]>;
    isLoading: Ref<boolean>;
    isNetworkError: Ref<boolean>;
    axiosError: Ref<AxiosError | null>;
}

export function getUsers(): UsersFetchState {
    const users = ref<UserFetchResponse[]>([]);
    const isLoading = ref(false);
    const isNetworkError = ref(false);
    const axiosError = ref<AxiosError | null>(null);

    async function fetchUsers(): Promise<void> {
        isLoading.value = true;
        users.value = [];

        try {
            const response = await userService.getUsers();
            users.value = response.data;
            isNetworkError.value = false;
        } catch (err: unknown) {
            logRequestError("fetchUsers", err);
            axiosError.value = axios.isAxiosError(err) ? err : null;
            isNetworkError.value = true;
        } finally {
            isLoading.value = false;
        }
    }

    return { fetchUsers, users, isLoading, isNetworkError, axiosError };
}
