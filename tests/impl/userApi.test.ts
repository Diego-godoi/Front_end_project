import { HTTP_STATUS } from "@/constants/appConstants";
import type { CreateUserRequest, UpdateUserRequest } from "@/dtos/userDtos";
import { userService } from "@/services/userApi";
import { server } from "@/setupTests";
import { http, HttpResponse } from "msw";

describe("userService Unit Tests", () => {
  it("when fetch users is triggered then expect two items", async () => {
    const response = await userService.getUsers();

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.data.length).toBe(2);
  });

  it("when creating a user then expect response to be equal request", async () => {
    const request: CreateUserRequest = {
      name: "workout",
      email: "workout@test.com",
      password: "unitTest",
    };

    const response = await userService.createUser(request);

    expect(response.status).toBe(HTTP_STATUS.CREATED);
    expect(response.data).toEqual(request);
  });

  it("when delete a user request is sent then expect 204 back", async () => {
    const response = await userService.deleteUser("9");

    expect(response.status).toBe(HTTP_STATUS.NO_CONTENT);
  });

  it("when updating a user then expect response to be equal request", async () => {
    const request: UpdateUserRequest = {
      id: "4",
      name: "buy groceries",
      email: "groceries@test.com",
      password: "unitTest",
    };

    const response = await userService.updateUser(request);

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.data).toEqual(request);
  });

  it("when bad user creation request is sent then expect 400 back", async () => {
    server.use(
      http.post("*/users", () => {
        return HttpResponse.json({ message: "Bad Request" }, { status: 400 });
      })
    );

    const request: CreateUserRequest = {
      // campos invalidos
      name: "",
      email: "email-invalido",
      password: "123",
    };

    try {
      await userService.createUser(request);
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.response).toBeDefined();
      expect(error.response.status).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(error.response.data.message).toBe("Bad Request");
    }
  });

  it("when wrong user creation request is sent then expect 500 back", async () => {
    server.use(
      http.post("*/users", () => {
        return HttpResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
      })
    );

    const request: CreateUserRequest = {
      name: "workout",
      email: "workout@test.com",
      password: "unitTest",
    };

    try {
      await userService.createUser(request);
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.response).toBeDefined();
      expect(error.response.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(error.response.data.message).toBe("Internal Server Error");
    }
  });
});
