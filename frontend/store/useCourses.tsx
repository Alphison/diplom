import { immer } from 'zustand/middleware/immer'
import { create } from "zustand";
import { CourseService } from 'services/Courses.service';
import {CourseType, CategoryType} from "../types/type"
import { CategoryService } from 'services/Category.service';

type StateCourses = {
    courses: CourseType[];
    loading: boolean;
    error: string | null;
    fetchCourses: () => void
}

type StateCategory = {
    categories: CategoryType[];
    loading: boolean;
    error: string | null;
    fetchCategory: () => void
}

export const useCourses = create<StateCourses>()(immer(set => ({
    courses: [],
    loading: false,
    error: null,
    fetchCourses: async () => {
        set({loading: true})

        try {
            const res = await CourseService.getAll()

            // if(!res.ok) throw new Error('Failed to fetch! Try again')

            set({courses: res.data.data})
        } catch(error: any) {
            set({error: error})
        } finally {
            set({loading: false})
        }
    }
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