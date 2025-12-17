export enum UserState {
    OPEN,
    CLOSED,
}
export enum Priority {
    LOW, MEDIUM, HIGH
}

export interface CreateUserRequest {
    name: string,
    email: string,
    password: string
    isReminderSet: boolean,
    isUserOpen: boolean,
    priority: Priority
}

export interface UpdateUserRequest {
    id: number,
    name: string | null,
    email: string | null,
    password: string | null,
    isReminderSet: boolean | null,
    isUserOpen: boolean | null,
    priority: Priority | null
}

export interface UserFetchResponse {
    id: number,
    name: string,
    email: string,
    isUserOpen: boolean | null,
    isReminderSet: boolean | null,
    priority: Priority | null,
    createdOpen: string | null,
}