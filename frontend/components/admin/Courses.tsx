import React, { FC, useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { animStat } from 'animation/animation';
import { useCategory, useCourses } from 'store/useCourses';
import { RiSearchLine } from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai'
import Swal from 'sweetalert2';
import { Loader } from '@react-three/drei';
import { CourseDataType, useCourse } from 'store/useCourse';
import { CourseType } from 'types/type';

interface AddCourseType{
  setActiveRazdel: (text:string) => void;
  setCourse: (course: CourseDataType) => void;
}

const Courses:FC<AddCourseType> = ({setActiveRazdel, setCourse}) => {
    const {course, fetchCourse} = useCourse(state => ({
      course: state.course,
      fetchCourse: state.fetchCourse
  }))
    const {courses, fetchCourses, fetchCourseDelete, deleteCourse, error, loading} = useCourses(state => ({
      courses: state.courses,
      fetchCourses: state.fetchCourses,
      fetchCourseDelete: state.fetchCourseDelete,
      deleteCourse: state.deleteCourse,
      error: state.error,
      loading: state.loading
    }))
    const {categories, fetchCategory} = useCategory(state => ({categories: state.categories, fetchCategory: state.fetchCategory}))
    const [cat, setCat] = useState(0)
    const [search, setSearch] = useState('')

    const usersData = cat === 0 ? courses : courses?.filter(item => item.category_id === cat)

    const usersDataSearch = usersData?.filter(item => item.name?.includes(search))

    useEffect(() =>{
      fetchCourses()
      fetchCategory()
    }, [])

    const modalFunc = async (id:any) => {
      return Swal.fire({
        title: 'Вы хотите удалить курс?',
        text: "Вы не сможете отменить это!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5840EA',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Да, удалить!'
      }).then((result) => {
        if (result.isConfirmed) {
          fetchCourseDelete(id)
          if(error === null){
            Swal.fire(
              'Удалён!',
              'Курс успешно удалён',
              'success'
            )
            deleteCourse(id)
          }
        }
      })
    }

    const handleSetEdit = (id:any) => {
      fetchCourse(id)
      setCourse(course!)
      setActiveRazdel('Редактирование')
    }

    if(loading){
      return <Loader />
    }

  return (
    <motion.div variants={animStat} initial={'hidden'} animate={'visible'}>
      <div className="row__tabel">
        <form>
          <select name="" id="" className="users-inp" onChange={(e) => setCat(parseInt(e.target.value, 10))}>
            <option value="0">Все</option>
            {
                categories?.map((item) => {
                    return <option value={item.id}>{item.name}</option>
                })
            }
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
                <th>Название</th>
                <th>Преподаватель</th>
                <th>Действия</th>
            </tr>
            {
               usersDataSearch?.length === 0 ? <tr><td><p className="message-null">По вашему запросу никого не найдено...</p></td></tr> :
              usersDataSearch?.map((item) => {
                return (
                  <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.user_id}</td>
                      <td>
                        <button className="ikon_delete-user2" onClick={() => handleSetEdit(item.id)}><AiFillEdit /></button>
                        <button className="ikon_delete-user" onClick={() => modalFunc(item.id)}><AiFillDelete /></button>
                      </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </motion.div>
  )
}

export default Courses