"use client"

import React from "react";
import Image from "next/image";
import ava from "../../public/images/ava.png"
import Model from "../../components/model/model";
import "swiper/css";
import "swiper/css/pagination";
import Slider from "components/Slider/Slider";
import { useCourses } from "hooks/useCourses";


const Page = () => {
    const {courses, isSuccess, isLoading} = useCourses()

    return (
        <>
            <div className="modal-form">
                <div className="modal-form__inner">
                    <div className="close"><Image alt="" src={"/images/x.png"} width={10} height={10}/></div>
                    <div className="okno__modal-form">
                        <h1 className="h1__modal-form">
                            КОНСУЛЬТАЦИЯ
                        </h1>
                        <div className="message">
                        </div>
                        <form method="POST" name="form">
                            <div className="inp-box">
                                <input type="text" name="name" id="name-form" placeholder = " "/>
                                    <p className="placeholder">
                                        Как вас зовут?
                                    </p>
                            </div>
                            <div className="inp-box">
                                <input type="text" name="phone" id="phone-mask" placeholder = " "/>
                                    <p className="placeholder">
                                        Какой у вас номер телефона?
                                    </p>
                            </div>
                            <button className="btn btn_modal-form" id="submit-form" name="form" type="button">Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="home">
                <div className="canvas">
                    <Model />
                </div>
                <h1 className="h1-home">
                    SCHOOLPOLI
                </h1>
                <div className="button_block">
                    <a href="?home#courses" className="btn-home btn">
                        Курсы
                    </a>
                </div>
            </div>
            <div className="our-courses block" id="courses">
                <h1 className="zag zag_our-courses">
                    Новые курсы
                </h1>
                <Slider courses={courses?.data.data} isSuccess={isSuccess} isLoading={isLoading}/>
            </div>
            <div className="about-us block" id="aboutus">
                <h1 className="zag zag_about-us">
                    О школе
                </h1>
                <div className="text_about-us">
                    Совместно с экспертами составляем программы и обучаем всем аспектам 3D-графики: создавать персонажей и предметы окружения, анимировать их и делать моушен-дизайн. Делаем упор на практику — на каждом курсе десятки заданий с проверкой.
                </div>
            </div>
            <div className="benefits block">
                <h1 className="zag h1__benefits">
                    Почему SchoolPoli
                </h1>
                <div className="blocks__benefits">
                    <div className="block__benefits">
                        <p className="name-block__benefits">
                            Преподаватели
                        </p>
                        <p className="text-block__benefits">
                            Все наши преподаватели — практики. Работают в Mail.ru, Inquake, RJ-games, Geeks, Nival, Game Insight, FuryLion, Playrix и Crazy Panda.
                        </p>
                    </div>
                    <div className="block__benefits">
                        <p className="name-block__benefits">
                            Платформа
                        </p>
                        <p className="text-block__benefits">
                            Собственная обучающая платформа, где студенты могут смотреть учебные материалы и получать фидбэк на дз.
                        </p>
                    </div>
                    <div className="block__benefits">
                        <p className="name-block__benefits">
                            Сообщество
                        </p>
                        <p className="text-block__benefits">
                            У каждого студента открыт доступ к Дискорду — в котором они могут общаться с преподавателями, обмениваться лайфхаками и помогать друг другу с домашкой.
                        </p>
                    </div>
                </div>
            </div>
            <div className="prepods block">
                <h1 className="zag h1__prepods">
                    ПРЕПОДАВАТЕЛИ
                </h1>
                <div className="blocks__prepods">
                    <div className="block__prepods">
                        <div className="img__prepods">
                            <Image src={ava} alt="" width={100} height={100}/>
                        </div>
                        <div className="content_prepod">
                            <h2 className="name-block__prepods">

                            </h2>
                            <p className="text-block__prepods">
                                3D-художник, дизайнер существ, скульптор Zbrush. Работает подрядчиком в ID Software. Работал с Mail.ru, Inquake, RJ-games, Geeks, DAGGER CROWN STUDIO.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="questions block" id="contacts">
                <div className="column__questions">
                    <h1 className="h1__questions">
                        ВОПРОСЫ?
                    </h1>
                    <p className="text__questions">
                        Оставь свой номер телефона и мы свяжемся с тобой, чтобы ответить на все вопросы
                    </p>
                    <a className="btn btn-questions">НУЖНА КОНСУЛЬТАЦИЯ</a>
                </div>
                <div className="column__questions">
                    <Image src="/images/foto_questions.png" width={100} height={100} alt=""/>
                </div>
            </div>
        </>
    )
}

export default Page