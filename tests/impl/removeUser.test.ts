import { removeUser } from "@/composables/removeUser";
import { userService } from "@/services/userApi";
import { AxiosError, type AxiosResponse } from "axios";

describe("removeUser tests", async () => {
  const id: string = "2";
  const isLoading: Ref<boolean> = ref(false);
  const isNetworkError: Ref<boolean> = ref(false);
  const axiosError: Ref<AxiosError | unknown> = ref(null);
  const fetchUsers = vi.fn();

  it("when remove user is called then expect success path", async () => {
    userService.deleteUser = async () => ({} as AxiosResponse);

    await removeUser(id, isLoading, isNetworkError, axiosError, fetchUsers);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(axiosError.value).toBeFalsy();
    expect(fetchUsers).toHaveBeenCalled();
  });

  it("when delete user is called then expect network error", async () => {
    const errorMessage = "Network error";
    const mockError = new AxiosError(errorMessage);

    userService.deleteUser = vi.fn(() => Promise.reject(mockError));

    await removeUser(id, isLoading, isNetworkError, axiosError, fetchUsers);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(axiosError.value).toEqual(mockError);
  });
});
