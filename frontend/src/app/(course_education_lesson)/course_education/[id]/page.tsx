'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { HiUsers } from 'react-icons/hi'
import { useCourse } from 'store/useCourse'
import { useCategory } from 'store/useCourses'
import { useLessonUser } from 'store/useLessonUser'
import { useLesson } from 'store/useLessons'
import { uselogin } from 'store/useSign'

const CourseEducation = ({params}:any) => {
  const router = useRouter()

  const {course, loading, error, fetchCourse} = useCourse(state => ({
    course: state.course,
    loading: state.loading,
    error: state.error,
    fetchCourse: state.fetchCourse
  }))

  const {lesson_user, fetchLessonUser} = useLessonUser(state => ({
    lesson_user: state.lesson_user,
    fetchLessonUser: state.fetchLessonUser
  }))

const {
  categories,
  loading: Loading,
  error: Error,
  fetchCategory,
} = useCategory((state) => ({
  loading: state.loading,
  categories: state.categories,
  error: state.error,
  fetchCategory: state.fetchCategory,
}));

const {lessons, fetchLessons} = useLesson(state => ({
  lessons: state.lessons,
  fetchLessons: state.fetchLessons,
}))

const lessons_course = lessons.filter(lesson => lesson.course_id === course?.data.id)

const cat = categories?.find(category => category.id === course?.data.category_id)

const {access_token, getToken, fetchUser, user, fetchUpdateRole} = uselogin(state => ({
  access_token: state.access_token,
  getToken: state.getToken,
  fetchUser: state.fetchUser,
  user: state.user,
  fetchUpdateRole: state.fetchUpdateRole
}))

useEffect(() => {
  fetchCourse(params.id)
  fetchCategory()
  fetchLessons()
  fetchLessonUser()
  fetchUser(access_token)
  getToken()
}, [])

const src = `${process.env.NEXT_PUBLIC_API}storage/${course?.data.img_course}`

  return (
    <div className='content__course-education'>
        <div className="preview__course">
          <div className="wrapper-preview__course"></div>
          <Image width={124} height={70} loader={() => src} src={src} alt="" />
          <div className="info-preview__course">
            <div className="mini-preview__course">
              <Image loader={() => src} src={src} width={1558} height={425} alt="" />
            </div>
            <p className="name-course-edication">{course?.data.name}</p>
            <div className="haracters_course">
              <div className="haracter_course">
                <div className="el-haracter_course"></div>
                <p className="name-haracter_course">{cat?.name}</p>
              </div>
              <div className="haracter_course">
                <div className="el-haracter_course"></div>
                <p className="name-haracter_course">Beginner</p>
              </div>
              <div className="haracter_course">
                <div className="el-haracter_course"></div>
                <div className="name-haracter_course"><HiUsers />Beginner</div>
              </div>
            </div>
            <div className="technologies-course">
              <div className="ikon-techno"><Image width={30} height={24} src="/images/blender.png" alt="" /></div>
              <p className="name-techno">Blender Technologies</p>
            </div>
          </div>
        </div>
        <div className="description-block">
          <div className="info-block-description">
            <div className="block-name__description">
              <div className="name-description">Обзор</div>
              <hr className='hr-name-description' />
            </div>
            <h2 className='h2-zag-description'>Описание</h2>
            <p className="text-description">
              {course?.data.description}
            </p>
          </div>
        </div>
        <div className="lessons-block">
          <div className='hr-el-lessons-block'></div>
          <div className="lessons-block__course-education">
            {
              lessons_course?.map((item) => {
                const src = `${process.env.NEXT_PUBLIC_API}storage/${item.preview}`
                const lesson_user_have = lesson_user?.find((item2) => item2.lesson_id === item?.id && item2.user_id === user?.id)
                return (
                  <div className="lesson-block__course-education">
                    {
                      lesson_user_have ? <div className="success-lesson"><Image src={'/images/Done.png'} alt="" width={37} height={37}/></div> : null
                    }
                    <button className="el-lesson-block" onClick={() => router.push(`/lesson/${item.id}`)}><Image src={'/images/Frame.png'} width={10} height={16} alt=''/></button>
                    <div className="img-lesson-block__course-education">
                      <Image loader={() => src} src={src} alt="" width={390} height={220}/>
                    </div>
                    <div className="info-lesson-block__course-education">
                      <div className="name-lesson-block__course-education">
                        {item.name}
                      </div>
                      <div className="technologies-course">
                        <div className="ikon-techno"><Image width={30} height={24} src="/images/blender.png" alt="" /></div>
                        <p className="name-techno">Blender Technologies</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
    </div>
  )
}

export default CourseEducation