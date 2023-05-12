import { immer } from 'zustand/middleware/immer'
import { create } from "zustand";
import { CourseService } from 'services/Courses.service';
import {CourseType, CategoryType} from "../types/type"
import { CategoryService } from 'services/Category.service';
import { LessonService } from 'services/Lesson.service';

type StateCourses = {
    courses: CourseType[] | undefined;
    loading: boolean;
    error: [string] | null;
    fetchCourses: () => void;
    fetchAddCourse: (data:CourseType) => void;
    status: number | null;
    setStatus: () => void;
    fetchCourseDelete: (id:number) => void;
    deleteCourse: (id:number) => void;
    fetchUpdateCourse: (data:CourseType, id:number,) => void;
}

type StateCategory = {
    categories: CategoryType[];
    loading: boolean;
    error: string | null;
    fetchCategory: () => void;
}

export const useCourses = create<StateCourses>()(immer(set => ({
    courses: undefined,
    loading: false,
    error: null,
    status: null,
    fetchCourses: async () => {
        set({loading: true})

        try {
            const res = await CourseService.getAll()

            // if(!res.ok) throw new Error('Failed to fetch! Try again')
            set({courses: res.data})
        } catch(error: any) {
            set({error: error})
        } finally {
            set({loading: false})
        }
    },
    fetchAddCourse: async (data) => {
        set({loading: true})

        try {
            const res = await CourseService.addCourse(data)
            set({status: res.status})

        } catch (error:any) {
            set({error: error.response.data.errors.img_course})
        }finally{
            set({loading: false})
            // set({error: null})
        }
    },
    fetchCourseDelete: async (id:number) => {
        set({loading: true})
        try {
            await CourseService.delete(id)
        } catch(error: any) {
            set({error: error.response.data})
        } finally {
            set({loading: false})
        }
    },
    fetchUpdateCourse: async (data, id) => {
        set({loading: true})
        try {
            const res = await CourseService.update(data, id)
            set({status: res.status})
        } catch(error: any) {
            set({error: error.response.data.errors.img_course})
        } finally {
            set({loading: false})
        }
    },
    deleteCourse: (id:number) => {
        set((state) => {state.courses = state.courses?.filter(item  => item.id !== id)})
    },
    setStatus: () => set({status: null})

})))

export const useCategory = create<StateCategory>()(immer(set => ({
    categories: [],
    loading: false,
    error: null,
    fetchCategory: async () => {
        set({loading: true})

        try {
            const res = await CategoryService.getAll()

            // if(!res.ok) throw new Error('Failed to fetch! Try again')

            set({categories: res.data.data})
        } catch(error: any) {
            set({error: error})
        } finally {
            set({loading: false})
        }
    }
})))