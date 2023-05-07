"use client"

import { FC, useState } from "react";
import "../../globals.css"
import Image from "next/image";
import { useCourse } from "store/useCourse";
import {useEffect} from "react"
import { useUsers } from "store/useUser";
import { useLesson } from "store/useLessons";
import { uselogin } from "store/useSign";
import { useCourseUser } from "store/useCourseUser";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Loader from 'public/loader/Loader'

const Course: FC = ({params}:any) => {
    const router = useRouter()

    const {course, loading, error, fetchCourse} = useCourse(state => ({
        course: state.course,
        loading: state.loading,
        error: state.error,
        fetchCourse: state.fetchCourse
    }))

    const {access_token, getToken, fetchUser, user, fetchUpdateRole} = uselogin(state => ({
        access_token: state.access_token,
        getToken: state.getToken,
        fetchUser: state.fetchUser,
        user: state.user,
        fetchUpdateRole: state.fetchUpdateRole
    }))

    const {lessons, fetchLessons} = useLesson(state => ({
        lessons: state.lessons,
        fetchLessons: state.fetchLessons,
    }))

    const {course_user, fetchCourseUser, fetchAddCourseUser, status, addCourseUser} = useCourseUser(state => ({
        course_user: state.course_user,
        fetchCourseUser: state.fetchCourseUser,
        fetchAddCourseUser: state.fetchAddCourseUser,
        status: state.status,
        loading: state.loading,
        addCourseUser: state.addCourseUser
    }))

    const lessons_course = lessons.filter(lesson => lesson.course_id === course?.data.id)

    const {users, fetchUsers} = useUsers(state => ({
        users: state.users,
        fetchUsers: state.fetchUsers
    }))

    const course_user_have = course_user?.find((item) => item.course_id === course?.data.id && item.user_id === user?.id)

    useEffect(() => {
        fetchCourse(params.id)
        fetchUsers()
        fetchLessons()
        getToken()
        fetchCourseUser()
        fetchUser(access_token)
    }, [])

    const prepod = users.find(item => item.id === course?.data.user_id)

    const src = `${process.env.NEXT_PUBLIC_API}storage/${course?.data.img_course}`
    const srcUser = `${process.env.NEXT_PUBLIC_API}${prepod?.ava}`

    const data = new FormData() as any
    data.append('role', 'Ученик')

    const data2 = {
        course_id: course?.data.id,
        user_id: user?.id,
    }

    const handleEnroll = () => {
        if(access_token){
            fetchAddCourseUser({course_id: course?.data.id, user_id: user?.id})
            fetchUpdateRole({access_token, data})
            addCourseUser(data2)
            return Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Вы успешно записались на курс!',
                showConfirmButton: false,
                timer: 2000
            })
        }else{
            return Swal.fire({
                title: 'Вы хотите записаться на курс?',
                text: "Вам необходимо авторизироваться!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#5840EA',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Войти'
              }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/sign')
                }
              })
        }
    }

    const Button = () => {
        if(!course_user_have){
            if(!access_token || user?.role === 'Пользователь' || user?.role === 'Ученик'){
                return (
                    <button className="btn btn_home-cours" onClick={() => handleEnroll()}>
                        {loading ? <Loader /> : 'Записаться'}
                    </button>
                )
            }
        }
    }

    if(loading){
        return <Loader />
    }else{
        return (
            <div className="courseWrapper" id="page-wrap">
                <div className="home-cours">
                    <div className="shadow-inner"></div>
                    <div className="img-home-course">
                        <Image width={1920} height={746} loader={() => src} src={src} alt="" />
                    </div>
                    <div className="content_home-cours">
                        <h1 className="h1_home-cours">
                            {course?.data.name}
                        </h1>
                        <div className="contents_home-cours">
                            <div className="content_home-cours_wrapper">
                                <p className="text_home-cours">
                                    {course?.data.description}
                                </p>
                                <div className="row_home-cours">
                                    <div className="column_home-cours">
                                        <div className="circule"></div>
                                        <label className="text-col_home-course">
                                            <p>Уровень знаний</p>
                                            <p>нормальный</p>
                                        </label>
                                    </div>
                                    <div className="column_home-cours">
                                        <div className="circule"></div>
                                        <label className="text-col_home-course">
                                            <p>Продолжительность</p>
                                            <p>{course?.data.duration}</p>
                                        </label>
                                    </div>
                                </div>
                                {
                                    Button()
                                }
                                {
                                    course_user_have && user?.role === 'Ученик' ?
                                        <button className="btn btn_home-cours">
                                            Перейти к обучению
                                        </button>
                                    : null
                                }
                            </div>
                            <div className="img-content-course">
                                <Image loader={() => src} src={src} width={621} height={364} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profection block">
                    <h1 className="h1__profection zag">О профессии</h1>
                    <p className="text__profection">
                        {course?.data.profession}
                    </p>
                </div>
                <div className="prepod block">
                    <h1 className="h1__prepod zag">
                        Преподаватель
                    </h1>
                    <div className="content__prepod">
                        <div className="column__prepod">
                            <div className="ava__prepod">
                                <Image loader={() => srcUser} src={srcUser} width={128} height={128} alt={''}/>
                            </div>
                            <h2 className="name__prepod">
                                {prepod?.name}<br/>
                                {prepod?.surname}
                            </h2>
                        </div>
                        <div className="column__prepod">
                            <p className="text__prepod">
                                3D-художник, дизайнер существ, скульптор Zbrush. Работает подрядчиком в ID Software. Работал с Mail.ru, Inquake, RJ-games, Geeks, DAGGER CROWN STUDIO.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="plan block">
                    <h1 className="h1__plan zag">
                        О плане обучения
                    </h1>
                    <p className="text__plan">
                        {course?.data.goal}
                    </p>
                    <hr/>
                    <div className="row__plan">
                        <div className="column__plan">
                            <p className="name-column__plan">
                                количество материала
                            </p>
                            <div className="text-column__plan">
                                {lessons_course.length} обучающих<br/>
                                уроков<br/>
                                + домашка
                            </div>
                        </div>
                        <hr className="hr-plan"/>
                        <div className="column__plan">
                            <p className="name-column__plan">
                                формат
                            </p>
                            <div className="text-column__plan">
                                предзаписанные<br/> лекции
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
}

export default Course