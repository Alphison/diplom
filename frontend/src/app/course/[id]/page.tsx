"use client"

import { FC } from "react";
import "../../globals.css"
import ava from "../../../../public/images/ava.png"
import Image from "next/image";
import { useCourse } from "hooks/useCourse";
import { useSearchParams } from "next/navigation";

const Course: FC = ({params}:any) => {

    const {course, isLoading, isSuccess} = useCourse(params.id)

    const courseData = course?.data

    return (
        <div className="courseWrapper">
            <div className="home-cours">
                <div className="img-home-course">
                    <img src={courseData?.img_course} alt="" />
                </div>
                <div className="content_home-cours">
                    <div className="content_home-cours_wrapper">
                        <h1 className="h1_home-cours">
                            {courseData?.name}
                        </h1>
                        <p className="text_home-cours">
                            {courseData?.description}
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
                                    <p>{courseData?.data} месяцев</p>
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
                <h1 className="h1__profection zag">О ПРОФЕССИИ</h1>
                <p className="text__profection">
                    {courseData?.profession}
                </p>
                <hr/>
            </div>
            <div className="prepod block">
                <h1 className="h1__prepod zag">
                    ПРЕПОДАВАТЕЛЬ
                </h1>
                <div className="content__prepod">
                    <div className="column__prepod">
                        <div className="ava__prepod">
                            <Image src={ava} width={200} height={200} alt={''}/>
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
                <hr/>
            </div>
            <div className="plan block">
                <h1 className="h1__plan zag">
                    О ПЛАНЕ ОБУЧЕНИЯ
                </h1>
                <p className="text__plan">
                    dfgsdfgsdfg
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

export default Course