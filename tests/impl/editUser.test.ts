import { editUser } from "@/composables/EditUser";
import { userService } from "@/services/userApi";
import { AxiosError, type AxiosResponse } from "axios";
import { mockUserUpdateRequest } from "../helper/mockResponse";

describe("editUser tests", () => {
  const request = {
    id: "1",
    name: "New User",
    email: "user@email.com",
    password: "unitTest",
  };
  const isLoading: Ref<boolean> = ref(false);
  const isNetworkError: Ref<boolean> = ref(false);
  const axiosError: Ref<AxiosError | unknown> = ref(null);
  const navigateToUsersView = vi.fn();

  it("when update user is called then expect sucess path", async () => {
    userService.updateUser = async () =>
      ({
        data: mockUserUpdateRequest,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      } as AxiosResponse);

    await editUser(
      request,
      isLoading,
      isNetworkError,
      axiosError,
      navigateToUsersView
    );

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(axiosError.value).toBeFalsy();
    expect(navigateToUsersView).toHaveBeenCalled();
  });

  it("when update user is called then expect network error", async () => {
    const errorMessage = "Network error";
    const mockError = new AxiosError(errorMessage);

    userService.updateUser = vi.fn(() => Promise.reject(mockError));

    await editUser(
      request,
      isLoading,
      isNetworkError,
      axiosError,
      navigateToUsersView
    );

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(axiosError.value).toEqual(mockError);
    expect(mockError.message).toEqual(errorMessage);
  });
});
