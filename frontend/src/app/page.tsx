"use client"

import React from "react";
import Image from "next/image";
import Model from "../../components/model/model";
import { Pagination } from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "react-query/types/react";
import { CourseService } from "app/services/Courses.service";

const Page = () => {
    const {isLoading, data, error} = useQuery('courses list', () =>
        CourseService.getAll()
    )

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
                        КУРСЫ
                    </a>
                </div>
            </div>
            <div className="our-courses block" id="courses">
                <h1 className="zag zag_our-courses">
                    Новые курсы
                </h1>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={24}
                    grabCursor={true}
                    pagination={{
                    clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {data?.data.map((course:any) => (
                        <SwiperSlide>
                            <div className="block-course">
                                <div className="buttons__block">
                                    <a href="?edit=<?=$course['id_course']?>" className="button__block">
                                        <Image src="/images/edit.png" alt="" width={20} height={20}/>
                                    </a>
                                    <div data-id="?courses&delete=<?=$course['id_course']?>" className="button__block delete_modal_btn">
                                        <Image src="/images/trash.png" alt="" width={20} height={20}/>
                                    </div>
                                </div>

                                <div className="img_block-course">
                                    <Image src={course.img_course} alt="" width={635}
                                    height={365}/>
                                </div>
                                <div className="content_block-course">
                                    <div className="name-course">
                                        {course.name}
                                    </div>
                                    <div className="row_block-course">
                                        <p className="time"><Image src="/images/clock-outline.png" alt="" width={20} height={20}/>5 месяцев</p>
                                        <p className="status"><Image src="/images/ikon.png" alt="" width={20} height={20}/>Для начинающих</p>
                                    </div>
                                    <p className="text-course">
                                        {course.description}
                                    </p>
                                    <p className="price-course">
                                        {course.price} ₽
                                    </p>
                                    <a href="?cours=<?=$course['id_course']?>" className="more-course">
                                        ПОДРОБНЕЕ
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="about-us block" id="aboutus">
                <h1 className="zag zag_about-us">
                    О ШКОЛЕ
                </h1>
                <div className="text_about-us">
                    Совместно с экспертами составляем программы и обучаем всем аспектам 3D-графики: создавать персонажей и предметы окружения, анимировать их и делать моушен-дизайн. Делаем упор на практику — на каждом курсе десятки заданий с проверкой.
                </div>
            </div>
            <div className="benefits block">
                <h1 className="zag h1__benefits">
                    ПОЧЕМУ SCHOOLPOLI
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
                            <Image src="" alt="" width={100} height={100}/>
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