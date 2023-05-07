"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useCourseUser } from 'store/useCourseUser'
import { useCategory, useCourses } from 'store/useCourses'
import { useLessonUser } from 'store/useLessonUser'
import { useLesson } from 'store/useLessons'
import { uselogin } from 'store/useSign'

const Mycourses_student = () => {
    const router = useRouter();
    const { course_user, fetchCourseUser } = useCourseUser(state => ({course_user: state.course_user, fetchCourseUser: state.fetchCourseUser}))
    const {courses, fetchCourses} = useCourses(state => ({
        courses: state.courses,
        fetchCourses: state.fetchCourses
    }))
    const {categories, fetchCategory} = useCategory(state => ({categories: state.categories, fetchCategory: state.fetchCategory}))
    const { getToken, access_token, fetchUser, user } = uselogin(state => ({
        getToken: state.getToken,
        access_token: state.access_token,
        fetchUser: state.fetchUser,
        user: state.user
      }))
    const {lessons, fetchLessons, error} = useLesson(state => ({
        lessons: state.lessons,
        fetchLessons: state.fetchLessons,
        error: state.error
    }))

    

    useEffect(() => {
        fetchCourseUser()
        fetchCourses()
        fetchLessons()
        fetchCategory()
    }, [])

    useEffect(() => {
        getToken()
        fetchUser(access_token)
      }, [access_token])

    const course_user2 = course_user?.filter(item => item.user_id === user?.id)

    if(!course_user2){
        return <h2>Вы пока не записаны на курсы...</h2>
    }

  return (
    <div className="mycourses">
        <h1 className="h1__mycourses">
            Мои курсы
        </h1>
        <div className="row__courses">
            <div className="category category__courses">
                <button className="cat-el">Все</button>
                <button className="cat-el">Активные</button>
                <button className="cat-el">Завершенные</button>
            </div>
            <p className="count-courses">
                Всего курсов: {course_user2?.length}
            </p>
        </div>
        {
            course_user2?.map(item => {
                const courses_User = courses?.find(item2 => item2.id === item.course_id)
                const lessons_course = lessons.filter(lesson => lesson.course_id === item.course_id)
                const cat = categories?.find(category => category.id === courses_User?.category_id)
                return (
                    <div className="block__mycourses">
                        <div className="col__mycourses">
                            <p className="subname-mycourses">
                                {cat?.name}
                            </p>
                            <h1 className="name-mycourses">
                                {courses_User?.name}
                            </h1>
                            <div className="row__mycourses">
                                <p className="count__lessons">
                                    {lessons_course.length} уроков
                                </p>
                                <p className="status__course">
                                    Активный
                                </p>
                            </div>
                        </div>
                        <hr/>
                        <div className="rigth__column">
                            <h1 className="id__course">
                                1
                            </h1>
                            <div className="col__mycourses">
                                <p className="text__mycourses">
                                    Вы остановились на уроке:<br/>
                                    <span>Введение  в курс</span>
                                </p>
                                <div className="block_next-lesson">
                                    <button className="next__lesson" onClick={() => router.push(`/course_education/${courses_User?.id}`)}>Продолжить обучение<Image src="/images/arrow-right.png" width={24} height={24} alt=""/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Mycourses_student