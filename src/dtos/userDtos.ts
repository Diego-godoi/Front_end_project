export interface CreateUserRequest {
    name: string,
    email: string,
    password: string
}

export interface UpdateUserRequest {
    id: string,
    name: string | null,
    email: string | null,
    password: string | null,
}

export interface UserFetchResponse {
    id: string,
    name: string,
    email: string,
}