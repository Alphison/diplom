"use client"

import { interpolateBetweenColors } from 'hooks/useColor'
import { useLessonCount } from 'hooks/useLessonCount'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCourseUser } from 'store/useCourseUser'
import { useCategory, useCourses } from 'store/useCourses'
import { useLessonUser } from 'store/useLessonUser'
import { useLesson } from 'store/useLessons'
import { uselogin } from 'store/useSign'
import { redirect } from 'next/navigation'

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
    const {lesson_user, fetchLessonUser} = useLessonUser(state => ({
        lesson_user: state.lesson_user,
        fetchLessonUser: state.fetchLessonUser
    }))
    

    useEffect(() => {
        fetchCourseUser()
        fetchCourses()
        fetchLessons()
        fetchCategory()
        fetchLessonUser()
    }, [])

    useEffect(() => {
        getToken()
        fetchUser(access_token)
      }, [access_token])

    const course_user2 = course_user?.filter(item => item.user_id === user?.id)

    if(!course_user2){
        return <h2>Вы пока не записаны на курсы...</h2>
    }

    const token = JSON.parse(sessionStorage.getItem('access_token')!)
    if(!token){
        redirect('/sign')
    }

  return (
    <div className="mycourses" id='page-wrap'>
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
                
                let ls = lessons_course.map(lesson_course => {
                    const ls_success = lesson_user?.find(ls => ls.lesson_id === lesson_course.id && ls.user_id === user?.id)

                    return ls_success
                })

                const precentOneLesson = 100/lessons_course.length

                const ls_success = ls.filter(ls2 => ls2 !== undefined)
                const precentSuccessLesson = Math.ceil(ls_success.length * precentOneLesson)

                const ls_unsuccess = ls.filter(ls2 => ls2 === undefined)
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
                                    {useLessonCount(lessons_course.length)}
                                </p>
                                <p className="status__course">
                                    Активный
                                </p>
                            </div>
                        </div>
                        <hr/>
                        <div className="rigth__column">
                            <div className="col__mycourses">
                                <div className="row-col__mycourses">
                                    <div className="info-row-col-mycourses">
                                        <h1>Уроков</h1>
                                        <p>
                                            Пройдено: <span className="count-lesson-success">{ls_success.length}</span>
                                        </p>
                                        <p>
                                            Осталось: <span className="count-lesson-unsuccess">{ls_unsuccess.length}</span>
                                        </p>
                                    </div>
                                    <div className="block_next-lesson">
                                        <Image onClick={() => router.push(`/course_education/${courses_User?.id}`)} src="/images/arrow-right.png" width={24} height={24} alt=""/>
                                    </div>
                                </div>
                                <div className="row-col__mycourses">
                                    <p>Прогресс <span className="count-lesson-percent">{precentSuccessLesson ? precentSuccessLesson : 0}</span>%</p>
                                    <div className="wrapper-progress-bar">
                                        <div className="progress-bar" style={
                                            {
                                                width: `${precentSuccessLesson ? precentSuccessLesson : 0}%`,
                                                background: `${interpolateBetweenColors({r:116, g:214, b:92},{r:214, g:92, b:92},precentSuccessLesson)}`
                                            }}></div>
                                    </div>
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