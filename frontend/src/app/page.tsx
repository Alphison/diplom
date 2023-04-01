"use client"

import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import Slider from "components/Slider/Slider";
import {useEffect} from 'react'
import { useCourses } from "store/useCourses";


const Page = () => {
    const {courses, loading, error, fetchCourses } = useCourses((state) => ({
        courses: state.courses,
        loading: state.loading,
        error: state.error,
        fetchCourses: state.fetchCourses,
    }));

    useEffect(() => {
        fetchCourses()
    }, [])

    return (
        <>
           <Slider courses={courses}/>
        </>
    )
}

export default Page