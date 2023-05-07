"use client"

import React, { FC, useEffect, useState } from 'react'
import { motion } from "framer-motion"
import Image from 'next/image'
import { FiDownload } from 'react-icons/fi'
import { BsPlus } from 'react-icons/bs'
import Swal from 'sweetalert2'
import Loader from 'public/loader/Loader'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { animErrors, animStat } from 'animation/animation'
import { LessonType } from 'types/type'
import { useLesson } from 'store/useLessons'
import { animH1 } from 'animation/animation'

const addLesson:FC = ({params}:any) => {
    const [lesson, setLesson] = useState<LessonType>({name: '', description: '', course_id: params.id})
    const [foto, setFoto] = useState()
    const [fotos, setFotos] = useState<File[]>([])
    const [videos, setVideos] = useState<File[]>([])
    const { fetchAddLesson, error, status, loading, setStatus } = useLesson(state => ({
        fetchAddLesson: state.fetchAddLesson,
        error: state.error, status: state.status,
        loading: state.loading,
        setStatus: state.setStatus
    }))

    const handleInput = (e:any) => {
        setLesson({...lesson, [e.target.name]: e.target.value})
    }

    useEffect(() => {
    }, [])

    const [image, setImage] = useState('/images/null.png')
    const onImageChange = (event:any) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
          setFoto(event.target.files[0])
        }
    }

    const [images, setImages] = useState<string[]>([])
    const onImagesChange = (event:any) => {
        if (event.target.files && event.target.files[0]) {
            setImages(prevState => {
                const clone = [...prevState]
                for(let i = 0; i < event.target.files.length; i++) {
                    clone.push(URL.createObjectURL(event.target.files[i]))
                }
                return clone
            })
            setFotos(prevState => {
                const clone = [...prevState]
                for(let i = 0; i < event.target.files.length; i++) {
                    clone.push(event.target.files[i])
                }
                return clone
            })
        }
    }

    const onVideosChange = (e:any) => {
        if (e.target.files && e.target.files[0]) {
            setVideos(prevState => {
                const clone = [...prevState]
                for(let i = 0; i < e.target.files.length; i++) {
                    clone.push(e.target.files[i])
                }
                return clone
            })
        }
    }

    const submit = (e:any) => {
        e.preventDefault()
        const data = new FormData() as any
        data.append('name', lesson.name)
        data.append('description', lesson.description)
        data.append('preview', foto)
        data.append('img[]', fotos)
        data.append('video[]', fotos)
        fotos.forEach(file => {
            data.append('img[]', file);
        });
        videos.forEach(file => {
            data.append('video[]', file);
        });
        data.append('course_id', lesson.course_id)
        fetchAddLesson(data)
    }

    const message = () => {
        if(status == 200){
            reset()
            return Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Вы успешно добавили урок!',
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
        description: Yup.string()
          .required('Введите описание урока'),
      })
    
      const { register, handleSubmit, formState:{errors, isValid}, reset } = useForm<LessonType>({
        mode: 'onBlur',
        resolver: yupResolver(formSchema)
      });
  return (
    <motion.form className='add-course__wrapper add-course__wrapper' onSubmit={(e) => submit(e)} variants={animStat} initial={'hidden'} animate={'visible'}>
        <h1 className='zag__add-lesson'>Добавить урок</h1>
        <h3 className="name-image-input">
            Обложка урока:
        </h3>
        <label htmlFor="">
            <label htmlFor="image" className="wrapper-input">
                <input type="file" name="preview" id="image" onChange={(e) => onImageChange(e)}/>
                <Image src={image} width={1234} height={511} alt={'add-image'}/>
                <div className="ikon_label-image">
                    <FiDownload />
                </div>
            </label>
            {
                error ?
                error.preview?.map((item:any, i:number) => {
                    return (
                        <p className="error">{item}</p>
                    )
                })
                : null
            }
        </label>
        <label htmlFor="">
            <h3 className="name-image-input">
                Дополнительные изображения для урока:
            </h3>
            <div className='images__block-lesson_add'>
                {
                    images.map(image => {
                        return (
                            <motion.div variants={animH1} animate={'visible'} initial={'hidden'} className="img-block-add-lesson">
                                <Image src={image} width={350} height={200} alt=''/>
                            </motion.div>
                        )
                    })
                }
                <label htmlFor="images" className="wrapper-input-images">
                    <input type="file" multiple name="images" id="images" onChange={(e) => onImagesChange(e)}/>
                    <div className="ikon_label-image">
                        <BsPlus />
                    </div>
                </label>
            </div>
            {
                error &&
                Object.keys(error).map((key) => {
                    if(key.includes('img')){
                        for (let index = 0; index < error[key].length; index++) {
                                return (
                                    <p className='error'>{index}-{error[key][index]}</p>
                                )
                            
                        }
                    }

                    return null
                })
            }
        </label>
        <label htmlFor="" className='label-add-course'>
            <input {...register('name')} type="text" placeholder='Название курса' className='inp-text-add' onChange={(e) => handleInput(e)}/>
            {errors?.name && <motion.p variants={animErrors} initial={'hidden'} animate={'show'} className='error'>{errors?.name.message}</motion.p>}
        </label>
        <label htmlFor="" className='label-add-course'>
            <input name='video[]' multiple type="file" placeholder='Видео' className='inp-text-add' onChange={(e) => onVideosChange(e)}/>
            {
                error &&
                Object.keys(error).map((key) => {
                    console.log(error)
                    if(key.includes('video')){
                        for (let index = 0; index < error[key].length; index++) {
                                return (
                                    <p className='error'>{index}-{error[key][index]}</p>
                                )
                            
                        }
                    }

                    return null
                })
            }
        </label>
        <label htmlFor="" className='label-add-course'>
            <textarea {...register('description')} id="" placeholder='Описание урока' onChange={(e) => handleInput(e)}></textarea>
            {errors?.description && <motion.p variants={animErrors} initial={'hidden'} animate={'show'} className='error'>{errors?.description.message}</motion.p>}
        </label>
        <button className='btn-add-course' disabled={!isValid} onClick={(e) => submit(e)}>{loading ? <Loader /> : 'Добавить'}</button>
    </motion.form>
  )
}

export default addLesson