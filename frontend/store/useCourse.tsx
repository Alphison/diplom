import { immer } from 'zustand/middleware/immer'
import { create } from "zustand";
import { CourseService } from 'services/Courses.service';
import {CourseType} from "../types/type"

type StateCourses = {
    course: CourseType | null;
    loading: boolean;
    error: string | null;
    fetchCourse: (id:string) => void
}

export const useCourse = create<StateCourses>()(immer(set => ({
    course: null,
    loading: false,
    error: null,
    fetchCourse: async (id:string) => {
        set({loading: true})

        try {
            const res = await CourseService.getId(id)

            // if(!res.ok) throw new Error('Failed to fetch! Try again')

            set({course: res.data})
        } catch(error: any) {
            set({error: error})
        } finally {
            set({loading: false})
        }
    }
})))