"use client"

import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io"
import { AiOutlinePlus } from "react-icons/ai";
import { IoBook } from "react-icons/io5"; 
import { TbCategory } from "react-icons/tb";
import Image from "next/image";
import { motion } from "framer-motion";
import { Counter } from "../../../hooks/useAnimCount"
import { animH1, animStat, animStat2, animStat3 } from "animation/animation";
import { useUsers } from "store/useUser";
import { redirect, useRouter } from "next/navigation"
import { uselogin } from "store/useSign";
import { useCourses } from "store/useCourses";

const buttons = [
  {
    name: "Пользователи",
    icon: <FaUsers />,
    href: "/users"
  },
  {
    name: "Курсы",
    icon: <IoIosSchool />,
    href: "/courses_admin"
  },
  {
    name: "Добавить курс",
    icon: <AiOutlinePlus />,
    href: "/addCourse"
  },
  {
    name: "Уроки",
    icon: <IoBook />,
    href: "/les_admin"
  },
  {
    name: "Категории",
    icon: <TbCategory />,
    href: "/category_admin"
  }
]



const Layout = ({children}: {children: React.ReactNode}) => {
  const router = useRouter()
  const [activeRazdel, setActiveRazdel] = useState('Пользователи');
  const { fetchUsers, users} = useUsers(state => ({
        users: state.users,
        fetchUsers: state.fetchUsers
    }))
  const val = users?.length
  const {courses, fetchCourses} = useCourses(state => ({courses: state.courses, fetchCourses: state.fetchCourses}))
  const val_courses = courses?.length

  const prepods = users?.filter(item => item.role === 'Преподаватель')
  const val_prepods = prepods?.length

  const { getToken, access_token, fetchUser, user } = uselogin(state => ({
    getToken: state.getToken,
    access_token: state.access_token,
    fetchUser: state.fetchUser,
    user: state.user
  }))

  useEffect(() => {
    getToken()
    fetchCourses()
    fetchUser(access_token)
    fetchUsers()
  }, [access_token])

  const token = JSON.parse(sessionStorage.getItem('access_token')!)
  if(!token){
    redirect('/sign')
  }

    // if(user?.role !== 'Админ'){
    //     router.push('/')
    // }

  return (
    <div className="admin" id="page-wrap">
      <div className="admin-menu">
        <div className="admin-menu-inner">
          {
            buttons.map((item) => {
              return(
                <button
                    key={item.name}
                    onClick={() => {
                        router.push(item.href)
                        setActiveRazdel(item.name)
                    }}
                    className={activeRazdel === item.name ? "btn-meny-admin active" : "btn-meny-admin"}>
                    {item.icon}{item.name}
                </button>
              )
            })
          }
        </div>
      </div>
      <div className="admin-wrapper" id="page-wrap">
        <div className="admin__inner">
          <motion.h1 variants={animH1} custom={0.5} initial={'hidden'} animate={'visible'}>Админ панель</motion.h1>
          <div className="stats_site">
            <motion.div variants={animStat} custom={1} initial={'hidden'} animate={'visible'} className="stat-site">
              <div className="col__stat-site">
                <Counter val={val} time={150}/>
                <p className="name__count-stat">
                  Пользователя
                </p>
              </div>
              <div className="col__stat-site">
                <FaUsers />
              </div>
            </motion.div>
            <motion.div variants={animStat2} custom={2} initial={'hidden'} animate={'visible'} className="stat-site">
              <div className="col__stat-site">
                <Counter val={val_courses} time={200}/>
                <p className="name__count-stat">
                Курса
                </p>
              </div>
              <div className="col__stat-site">
                <IoIosSchool />
              </div>
            </motion.div>
            <motion.div variants={animStat3} custom={3} initial={'hidden'} animate={'visible'} className="stat-site">
              <div className="col__stat-site">
                <Counter val={val_prepods} time={250}/>
                <p className="name__count-stat">
                Преподавателя
                </p>
              </div>
              <div className="col__stat-site">
                <Image src="/images/prepod_svg.svg" alt="" width={85} height={85}/>
              </div>
            </motion.div>
          </div>
          <h2 className="name-razdel">{activeRazdel}</h2>
          {
            children
          }
        </div>
    </div>
    </div>
  );
};

export default Layout;
