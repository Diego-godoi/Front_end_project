export enum UserState {
    OPEN,
    CLOSED,
}


export interface CreateUserRequest {
    name: string,
    email: string,
    password: string
}

export interface UpdateUserRequest {
    id: number,
    name: string,
    email: string,
    password: string
}

export interface UserFetchResponse {
    id: number,
    name: string,
    email: string
    isUserOpen: boolean | null,
}