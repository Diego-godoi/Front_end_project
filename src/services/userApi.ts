import { HTTP_STATUS } from "@/constants/appConstants";
import type { CreateUserRequest, UpdateUserRequest } from "@/dtos/userDtos";
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from "axios";

const baseURL = 'http://localhost:8080';
const api: AxiosInstance = axios.create({ baseURL })

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response) {
            const { status } = error.response;
            if (status === HTTP_STATUS.BAD_REQUEST) {
                console.error("Bad Request: ", error.response.data);
            } else if (status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
                console.error("INternal Server Error: ", error.response.data);
            }
        } else {
            console.error("Error: ", error.message)
        }
        return Promise.reject(error);
    }
);

interface UserService {
    getUsers: (status: string) => Promise<AxiosResponse>;
    createUser: (data: CreateUserRequest) => Promise<AxiosResponse>;
    deleteUser: (id: number) => Promise<AxiosResponse>;
    updateUser: (data: UpdateUserRequest) => Promise<AxiosResponse>;
}

export const userService: UserService = {
    getUsers(status: string) {
        return api.get('/users');
    },
    createUser(data: CreateUserRequest) {
        return api.post('/users', data)
    },
    deleteUser(id: number) {
        return api.delete(`/users/&{id}`)
    },
    updateUser(data: UpdateUserRequest) {
        return api.put('/users', data)
    }

};