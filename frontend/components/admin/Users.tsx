// "use client"

import React, { FC, useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import '../../src/app/globals.css'
import { motion } from "framer-motion";
import { animStat } from "animation/animation";
import { UsersType, useUsers } from "store/useUser";
import Loader from "public/loader/Loader";

const Users:FC<UsersType> = ({users, loading, fetchUsers}) => {
  const [cat, setCat] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  const usersData = users?.filter(item => item.role.includes(cat))

  const usersDataSearch = usersData?.filter(item => item.name.includes(search) || item.surname.includes(search) || item.patronymic.includes(search))
  
  useEffect(() => {
    fetchUsers()
  }, [])

  if(loading){
    return <Loader />
  }


  return (
    <motion.div variants={animStat} initial={'hidden'} animate={'visible'}>
      <div className="row__tabel">
        <form>
          <select name="" id="" className="users-inp" onChange={(e) => setCat(e.target.value)}>
            <option value="">Все</option>
            <option value="Пользователь">Пользователи</option>
            <option value="Ученик">Ученики</option>
            <option value="Преподаватель">Преподаватели</option>
          </select>
        </form>
        <form action="">
          <label className="wrapper-search">
            <input type="text" className="inp-search" placeholder="Кого найти?" onChange={(e) => setSearch(e.target.value)}/>
            <div className="ikon-search">
                <RiSearchLine />
            </div>
          </label>
        </form>
      </div>
      <table className="table_users" cellSpacing="0">
        <tbody>
            <tr>
                <th>id</th>
                <th>ФИО</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Действия</th>
            </tr>
            {
               usersDataSearch?.length === 0 ? <tr><td><p className="message-null">По вашему запросу никого не найдено...</p></td></tr> :
               usersDataSearch?.map((item) => {
                return (
                  <tr>
                      <td>{item.id}</td>
                      <td>{item.surname} {item.name} {item.patronymic}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                      <td><button className="btn-up-user">Повысить до преподавателя</button></td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </motion.div>
  );
};

export default Users;
