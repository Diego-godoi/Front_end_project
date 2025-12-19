import { generateUser } from "@/composables/generateUser";
import { userService } from "@/services/userApi";
import { AxiosError, type AxiosResponse } from "axios";
import { mockUserCreateRequest } from "../helper/mockResponse";

describe("generateUser tests", () => {
  const request = {
    name: "New User",
    email: "user@email.com",
    password: "unitTest",
  };
  const isLoading: Ref<boolean> = ref(false);
  const isNetworkError: Ref<boolean> = ref(false);
  const axiosError: Ref<AxiosError | unknown> = ref(null);

  it("when generate user is called then expect success path", async () => {
    userService.createUser = async () =>
      ({
        data: mockUserCreateRequest,
        status: 201,
        statusText: "CREATED",
        config: {},
        headers: {},
      } as AxiosResponse);

    await generateUser(request, isLoading, isNetworkError, axiosError);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(false);
    expect(axiosError.value).toBeFalsy();
  });

  it("when generate user is called then expect network error", async () => {
    const errorMessage = "Network error";
    const mockError = new AxiosError(errorMessage);

    userService.createUser = vi.fn(() => Promise.reject(mockError));

    await generateUser(request, isLoading, isNetworkError, axiosError);

    expect(isLoading.value).toBe(false);
    expect(isNetworkError.value).toBe(true);
    expect(axiosError.value).toEqual(mockError);
  });
});
