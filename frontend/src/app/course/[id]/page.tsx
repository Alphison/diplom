"use client"

import { FC } from "react";
import "../../globals.css"
import ava from "../../../../public/images/ava.png"
import Image from "next/image";
import { useCourse } from "store/useCourse";
import { Loader } from "@react-three/drei";
import {useEffect} from "react"

const Course: FC = ({params}:any) => {

    const {course, loading, error, fetchCourse} = useCourse(state => ({
        course: state.course,
        loading: state.loading,
        error: state.error,
        fetchCourse: state.fetchCourse
    }))

    useEffect(() => {
        fetchCourse(params.id)
    }, [])

    if(loading){
        return <Loader />
    }else{
        return (
            <div className="courseWrapper">
                <div className="home-cours">
                    <div className="img-home-course">
                        <img src={course?.img_course} alt="" />
                    </div>
                    <div className="content_home-cours">
                        <div className="content_home-cours_wrapper">
                            <h1 className="h1_home-cours">
                                {course?.name}
                            </h1>
                            <p className="text_home-cours">
                                {course?.description}
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
                                        <p>{course?.data} месяцев</p>
                                    </label>
                                </div>
                            </div>
                            <a href="?cours=<?=$id_cours?>&zap" className="btn btn_home-cours">
                                ЗАПИСАТЬСЯ
                            </a>
                            <a href="?lesson=<?=$id_cours?>" className="btn btn_home-cours">
                                ПЕРЕЙТИ К УРОКАМ
                            </a>
                        </div>
                    </div>
                </div>
                <div className="profection block">
                    <h1 className="h1__profection zag">О профессии</h1>
                    <p className="text__profection">
                        {course?.profession}
                    </p>
                </div>
                <div className="prepod block">
                    <h1 className="h1__prepod zag">
                        Преподаватель
                    </h1>
                    <div className="content__prepod">
                        <div className="column__prepod">
                            <div className="ava__prepod">
                                <Image src={ava} width={128} height={128} alt={''}/>
                            </div>
                            <h2 className="name__prepod">
                                имя<br/>
                                фамилие
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
                        {course?.goal}
                    </p>
                    <hr/>
                    <div className="row__plan">
                        <div className="column__plan">
                            <p className="name-column__plan">
                                количество материала
                            </p>
                            <div className="text-column__plan">
                                234 обучающих<br/>
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