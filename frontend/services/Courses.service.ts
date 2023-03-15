import { CourseType } from './../types/type';
import axios from "axios"


axios.defaults.baseURL = process.env.NEXT_PUBLIC_API

interface AxiosCourses {
    data: CourseType[] | undefined
}



export const CourseService = {
    async getAll(){
        return axios.get<AxiosCourses>('courses')
    },
    async getId(id:string){
        return axios.get<CourseType>(`courses/${id}`)
    },
}