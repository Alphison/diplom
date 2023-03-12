import { CourseType } from './../types/type';
import axios from "axios"

const API_URL = 'http://127.0.0.1:8000/api/'
axios.defaults.baseURL = API_URL

export const CourseService = {
    async getAll(){
        return axios.get<CourseType[]>('courses')
    },
    async getId(id:string){
        return axios.get<CourseType>(`courses/${id}`)
    },
}