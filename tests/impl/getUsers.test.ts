import { getUsers } from "@/composables/getUsers";
import { userService } from "@/services/userApi";
import { AxiosError, type AxiosResponse } from "axios";
import { mockUserFetchResponse } from "../helper/mockResponse";

describe("getUsers tests", async () => {
  it("fetchUsers fills users array with mockUsersResponse", async () => {
    userService.getUsers = async () =>
      ({
        data: mockUserFetchResponse,
        status: 200,
        statusText: "OK",
      } as AxiosResponse);

    const { fetchUsers, users, isLoading, isNetworkError, axiosError } =
      getUsers();

    await fetchUsers();

    expect(users.value).toEqual(mockUserFetchResponse);
    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(axiosError.value).toBeFalsy();
  });

  it("handles error in fetchUsers", async () => {
    const errorMessage = "Network error";
    const mockError = new AxiosError(errorMessage);

    userService.getUsers = vi.fn(() => Promise.reject(mockError));

    const { fetchUsers, isLoading, isNetworkError, axiosError } = getUsers();

    await fetchUsers();

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(axiosError.value).toEqual(mockError);
    expect(mockError.message).toEqual(errorMessage);
  });
});
