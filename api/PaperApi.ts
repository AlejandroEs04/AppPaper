import api from "@/lib/axios"
import { isAxiosError } from "axios"

export async function getPaper() {
    try {
        const {data} = await api('/papers')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}