import { MIN_USER_NAME, MIN_USER_PASSWORD } from "@/constants/appConstants"

export const userBaseSchema = {
    name(value: string) {
        if (value?.length >= MIN_USER_NAME) return true
        return `Name needs to be at least ${MIN_USER_NAME} characters `
    },
    email(value: string) {
        if (value?.includes('@')) return true
        return `Email addresses must include the @ symbol`
    }
}

export const createUserSchema = {
    ...userBaseSchema,
    password(value: string) {
        if (value.length >= MIN_USER_PASSWORD) return true
        return `Password needs to be at least ${MIN_USER_PASSWORD} charactere`
    }
}

export const editUserSchema = {
    ...userBaseSchema,
    password(value: string) {
        if (!value) return true
        if (value.length >= MIN_USER_PASSWORD) return true
        return `Password needs to be at least ${MIN_USER_PASSWORD} charactere`
    }
}