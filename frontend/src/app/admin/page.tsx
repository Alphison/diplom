"use client"

import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io"
import { AiOutlinePlus } from "react-icons/ai";
import { IoBook } from "react-icons/io5"; 
import { TbCategory } from "react-icons/tb";
import Image from "next/image";
import Users from "../../../components/admin/Users"
import { motion } from "framer-motion";
import { Counter } from "../../../hooks/useAnimCount"
import AddCours from "components/admin/AddCours";
import { animH1, animStat, animStat2, animStat3 } from "animation/animation";
import { UsersType, useUsers } from "store/useUser";
import Swal from "sweetalert2";
import Courses from "components/admin/Courses";
import EditCourse from "components/admin/EditCourse";
import { CourseDataType } from "store/useCourse";

const buttons = [
  {
    name: "Пользователи",
    icon: <FaUsers />,
  },
  {
    name: "Курсы",
    icon: <IoIosSchool />,
  },
  {
    name: "Добавить курс",
    icon: <AiOutlinePlus />,
  },
  {
    name: "Уроки",
    icon: <IoBook />,
  },
  {
    name: "Категории",
    icon: <TbCategory />,
  }
]



const Admin = () => {
  const [activeRazdel, setActiveRazdel] = useState('Пользователи');
  const [course, setCourse] = useState<CourseDataType>()
  const { loading, fetchUsers, users, fetchUserDelete, error, deleteUser, fetchUserUpdate, updateUser} = useUsers<UsersType>(state =>
     ({users: state.users, loading: state.loading, fetchUsers: state.fetchUsers, fetchUserDelete: state.fetchUserDelete,
       error: state.error, deleteUser: state.deleteUser, fetchUserUpdate: state.fetchUserUpdate, updateUser: state.updateUser}))
  const val = users?.length
 
  

  return (
    <>
      <div className="admin-menu">
        <div className="admin-menu-inner">
          {
            buttons.map((item) => {
              return(
                <button className={activeRazdel === item.name ? "btn-meny-admin active" : "btn-meny-admin"} onClick={() => setActiveRazdel(item.name)}>{item.icon}{item.name}</button>
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
                <Counter val={137} time={10}/>
                <p className="name__count-stat">
                  Пользователей
                </p>
              </div>
              <div className="col__stat-site">
                <FaUsers />
              </div>
            </motion.div>
            <motion.div variants={animStat2} custom={2} initial={'hidden'} animate={'visible'} className="stat-site">
              <div className="col__stat-site">
                <Counter val={24} time={50}/>
                <p className="name__count-stat">
                Курсов
                </p>
              </div>
              <div className="col__stat-site">
                <IoIosSchool />
              </div>
            </motion.div>
            <motion.div variants={animStat3} custom={3} initial={'hidden'} animate={'visible'} className="stat-site">
              <div className="col__stat-site">
                <Counter val={12} time={150}/>
                <p className="name__count-stat">
                Преподавателей
                </p>
              </div>
              <div className="col__stat-site">
                <Image src="/images/prepod_svg.svg" alt="" width={85} height={85}/>
              </div>
            </motion.div>
          </div>
          <h2 className="name-razdel">{activeRazdel}</h2>
          {
            activeRazdel === 'Пользователи' ? <Users users={users} loading={loading} fetchUsers={fetchUsers} fetchUserDelete={fetchUserDelete} error={error} deleteUser={deleteUser} fetchUserUpdate={fetchUserUpdate} updateUser={updateUser}/> :
            activeRazdel === 'Добавить курс' ? <AddCours /> :
            activeRazdel === 'Курсы' ? <Courses setActiveRazdel={setActiveRazdel} setCourse={setCourse}/> :
            activeRazdel === 'Редактирование' ? <EditCourse course={course!}/> : null
          }
        </div>
    </div>
    </>
  );
};

export default Admin;
