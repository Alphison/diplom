import Image from 'next/image'
import React, { useState } from 'react'
import { FiDownload } from "react-icons/fi"
import { motion } from "framer-motion"
import { animStat } from 'animation/animation'

const AddCours = () => {
    const [image, setImage] = useState('/images/null.png')
    const onImageChange = (event:any) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

  return (
    <motion.form className='add-course__wrapper' variants={animStat} initial={'hidden'} animate={'visible'}>
        <h3 className="name-image-input">
            Изображение курса:
        </h3>
        <label htmlFor="image" className="wrapper-input">
            <input type="file" name="photo" id="image" onChange={(e) => onImageChange(e)}/>
            <Image src={image} width={1234} height={511} alt={'add-image'}/>
            <div className="ikon_label-image">
                <FiDownload />
            </div>
        </label>
        <input type="text" placeholder='Название курса' className='inp-text-add'/>
        <input type="text" placeholder='Продолжительность курса' className='inp-text-add'/>
        <input type="number" placeholder='Цена' className='inp-text-add' min={0}/>
        <select name="" id="" className='inp-text-add'>
            <option value="">Уровень знаний</option>
        </select>
        <select name="" id="" className='inp-text-add'>
            <option value="">Преподаватель</option>
        </select>
        <textarea name="" id="" placeholder='Описание курса'></textarea>
        <textarea name="" id="" placeholder='О профессии'></textarea>
        <textarea name="" id="" placeholder='Цель курса'></textarea>
        <button className='btn-add-course'>Добавить</button>
    </motion.form>
  )
}

export default AddCours