import type {
  CreateUserRequest,
  UpdateUserRequest,
  UserFetchResponse,
} from "../../src/dtos/userDtos";

export const mockUserFetchResponse: UserFetchResponse[] = [
  { id: "23", name: "test new nav", email: "test@test.com" },
  { id: "25", name: "Write new Unit Tests", email: "unitTests@test.com" },
];

export const mockUserUpdateRequest: UpdateUserRequest = {
  id: "25",
  name: "buy groceries",
  email: "buyGroceries@test.com",
  password: "unitTest",
};

export const mockUserCreateRequest: CreateUserRequest = {
  name: "workout",
  email: "workout@test.com",
  password: "unitTest",
};
