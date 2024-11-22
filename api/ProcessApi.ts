import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ProcessCreate, ProcessType, SaleProductType } from "../types";

export async function getProcess() {
    try {
        const { data } = await api<ProcessType[]>('/process')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProcessById(id: number) {
    try {
        const { data } = await api<ProcessType>(`/process/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function registerProcess(process: ProcessCreate): Promise<string> {
    try {
        const { data } = await api.post<string>('/process', process)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            console.log(error)
            throw new Error(error.response.data)
        } 
        throw new Error('Unexpected error'); 
    }
}

export async function finishProcess(formData: { data: ProcessType, processId: number }) {
    try {
        const { data } = await api.put<string>(`/process/finish/${formData.processId}`, formData.data)
        return data
    } catch (error) {
        console.log("Hola")
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
        throw new Error('Unexpected error'); 
    }
}

export async function getPendingProcess() {
    try {
        const { data } = await api<SaleProductType[]>(`/sales/products/all`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}