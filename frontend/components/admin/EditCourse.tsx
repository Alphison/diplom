import React, { FC, useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { animErrors, animStat } from 'animation/animation'
import { FiDownload } from "react-icons/fi"
import Image from 'next/image'
import { useCategory, useCourses } from 'store/useCourses'
import { CourseDataType, useCourse } from 'store/useCourse'
import { useUsers } from 'store/useUser'
import { CourseType } from 'types/type'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import Loader from 'public/loader/Loader'

interface EditCourseType{
    course: CourseDataType
}

const EditCourse:FC<EditCourseType> = ({course}) => {
    const src = `${process.env.NEXT_PUBLIC_API}storage/${course?.data.img_course}`    

    const [image, setImage] = useState(src)
    const [foto, setFoto] = useState()
    const {categories, fetchCategory} = useCategory(state => ({categories: state.categories, fetchCategory: state.fetchCategory}))
    const {users, fetchUsers} = useUsers(state => ({users: state.users, fetchUsers: state.fetchUsers}))
    const {fetchAddCourse, error, status, loading, setStatus} = useCourses(state => ({fetchAddCourse: state.fetchAddCourse, error: state.error, status: state.status, loading: state.loading, setStatus: state.setStatus}))
    const [courseOne, setCourse] = useState({
        name:  course?.data.name,
        description: course?.data.description,
        duration: course?.data.duration,
        user_id: course?.data.user_id,
        category_id: course?.data.category_id,
        profession: course?.data.profession,
        goal: course?.data.goal,
        price: course?.data.price
    })
    console.log(course)


    useEffect(() => {
        fetchCategory()
        fetchUsers()
    }, [])

    const onImageChange = (event:any) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
          setFoto(event.target.files[0])
        }
    }

    const handleInput = (e:any) => {
        setCourse({...courseOne, [e.target.name]: e.target.value})
    }

    const onChangeSelectForm = (e:any) => {
        setCourse((prevState:any) => {
            prevState = {...prevState}
            prevState[e.target.name] = e.target.options[e.target.selectedIndex].value
            return prevState
        })
    }

    const submit = (e:any) => {
        e.preventDefault()
        const data = new FormData() as any
        data.append('name', course.data.name)
        data.append('description', course.data.description)
        data.append('duration', course.data.duration)
        data.append('user_id', course.data.user_id)
        data.append('category_id', course.data.category_id)
        data.append('profession', course.data.profession)
        data.append('goal', course.data.goal)
        data.append('price', course.data.price)
        data.append('img_course', foto)
        fetchAddCourse(data)
    }

    const message = () => {
        if(status == 201){
            reset()
            return Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Вы успешно изменили курс!',
                showConfirmButton: false,
                timer: 2000
                })

        }
    }

    useEffect(() => {
        message()
        setStatus()
    }, [status])

    const formSchema = Yup.object().shape({
        name: Yup.string()
          .required('Введите название'),
        duration: Yup.string()
          .required('Введите продолжительность'),
        description: Yup.string()
        .required('Введите описание'),
        user_id: Yup.string()
          .required('Выберите преподавателя'),
        category_id: Yup.string()
          .required('Выберите уровень знаний'),
        profession: Yup.string()
          .required('Введите описание профессии'),
        goal: Yup.string()
          .required('Введите цель курса'),
        price: Yup.string()
          .required('Введите цену'),
      })
    
      const { register, handleSubmit, formState:{errors, isValid}, reset } = useForm<CourseType>({
        mode: 'onChange',
        resolver: yupResolver(formSchema)
      });

    
  return (
    <motion.form className='add-course__wrapper' onSubmit={(e) => submit(e)} variants={animStat} initial={'hidden'} animate={'visible'}>
        <h3 className="name-image-input">
            Изображение курса:
        </h3>
        <label htmlFor="">
            <label htmlFor="image" className="wrapper-input">
                <input type="file" name="photo" id="image" onChange={(e) => onImageChange(e)}/>
                <Image loader={() => src} src={image} width={1234} height={511} alt={'add-image'}/>
                <div className="ikon_label-image">
                    <FiDownload />
                </div>
            </label>
            {
                error ?
                error?.map((item:any, i:number) => {
                    return (
                        <p className="error">{item}</p>
                    )
                })
                : null
            }
        </label>
        
        <label htmlFor="" className='label-add-course'>
            <input {...register('name')} type="text" placeholder='Название курса' className='inp-text-add' onChange={(e) => handleInput(e)} value={course?.data.name}/>
            {errors?.name && <motion.p variants={animErrors} initial={'hidden'} animate={'show'} className='error'>{errors?.name.message}</motion.p>}
        </label>
        <label htmlFor="" className='label-add-course'>
            <input {...register('duration')} type="text" placeholder='Продолжительность курса' className='inp-text-add' onChange={(e) => handleInput(e)} value={course?.data.duration}/>
            {errors?.duration && <motion.p variants={animErrors} initial={'hidden'} animate={'show'} className='error'>{errors?.duration.message}</motion.p>}
        </label>
        <label htmlFor="" className='label-add-course'>
            <input {...register('price')} type="number" placeholder='Цена' className='inp-text-add' min={0} onChange={(e) => handleInput(e)} value={course?.data.price}/>
            {errors?.price && <motion.p variants={animErrors} initial={'hidden'} animate={'show'} className='error'>{errors?.price.message}</motion.p>}
        </label>
        <label htmlFor="" className='label-add-course'>
            <select {...register('category_id')} id="" className='inp-text-add' onChange={onChangeSelectForm.bind(this)}>
                <option selected disabled value="">Уровень знаний</option>
                {
                    categories.map(category => {
                        return (
                            <option value={category.id}>{category.name}</option>
                        )
                    })
                }
            </select>
            {errors?.category_id && <motion.p variants={animErrors} initial={'hidden'} animate={'show'} className='error'>{errors?.category_id.message}</motion.p>}
        </label>
        <label htmlFor="" className='label-add-course'>
            <select {...register('user_id')} id="" className='inp-text-add' onChange={onChangeSelectForm.bind(this)}>
                <option value="">Преподаватель</option>
                {
                    users.map(prepod => {
                        if(prepod.role === 'Преподаватель'){
                            return (
                                <option value={prepod.id}>{prepod.name}</option>
                            )
                        }
                    })
                }
            </select>
            {errors?.user_id && <motion.p variants={animErrors} initial={'hidden'} animate={'show'} className='error'>{errors?.user_id.message}</motion.p>}
        </label>
        <label htmlFor="" className='label-add-course'>
            <textarea {...register('description')} id="" placeholder='Описание курса' onChange={(e) => handleInput(e)}>{course?.data.description}</textarea>
            {errors?.description && <motion.p variants={animErrors} initial={'hidden'} animate={'show'} className='error'>{errors?.description.message}</motion.p>}
        </label>
        <label htmlFor="" className='label-add-course'>
            <textarea {...register('profession')} id="" placeholder='О профессии' onChange={(e) => handleInput(e)}>{course?.data.profession}</textarea>
            {errors?.profession && <motion.p variants={animErrors} initial={'hidden'} animate={'show'} className='error'>{errors?.profession.message}</motion.p>}
        </label>
        <label htmlFor="" className='label-add-course'>
            <textarea {...register('goal')} id="" placeholder='Цель курса' onChange={(e) => handleInput(e)}>{course?.data.goal}</textarea>
            {errors?.goal && <motion.p variants={animErrors} initial={'hidden'} animate={'show'} className='error'>{errors?.goal.message}</motion.p>}
        </label>
        <button className='btn-add-course' disabled={!isValid} onClick={(e) => submit(e)}>{loading ? <Loader /> : 'Сохранить'}</button>
    </motion.form>
  )
}

export default EditCourse