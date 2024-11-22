import api from "@/lib/axios"
import { UserLogin } from "@/types"
import { isAxiosError } from "axios"

export async function authenticateUser(formData : UserLogin) {
    try {
        const { data } = await api.post('/auth/login', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error('Unexpected error'); 
    }
}