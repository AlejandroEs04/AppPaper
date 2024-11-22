import { isAxiosError } from "axios";
import api from "../lib/axios";
import { ProductCreate, ProductType } from "../types";

export async function getProducts() {
    try {
        const { data } = await api<ProductType[]>('/products')
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function createProduct(product: ProductCreate) {
    try {
        const { data } = await api.post<string>('/products', product)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }  
        throw new Error('Unexpected error'); 
    }
}