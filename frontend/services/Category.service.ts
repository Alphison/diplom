import { CategoryType } from './../types/type';
import axios from "axios"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API

interface AxiosCategories {
    data: CategoryType[] | undefined
}

interface AxiosCategory {
    data: CategoryType | undefined
}

export const CategoryService = {
    async getAll(){
        return axios.get<AxiosCategories>('category')
    },
    async getId(id:string){
        return axios.get<AxiosCategory>(`category/${id}`)
    },
}