"use client"

import React from 'react'
import { AiFillDelete } from 'react-icons/ai'

const Category_admin = () => {
  return (
    <div className='categories-wrapper'>
        <div className="col__categories-wrapper">
            <div className="category-block">
                <p className="name-cat__categories-wrapper">dsfdsfgdfg</p>
                <button className="ikon_delete-user"><AiFillDelete /></button>
            </div>
            <div className="category-block">
                <p className="name-cat__categories-wrapper">dsfdsfgdfg</p>
                <button className="ikon_delete-user"><AiFillDelete /></button>
            </div>
        </div>
        <div className="col__categories-wrapper">
            <form>
                <div className="inp-box">
                    <input type="text" placeholder=" " className='input-pole-add-cat'/>
                    <p className="placeholder">Название</p>
                    {/* {errors?.email && <motion.div variants={animErrors} initial="hidden" animate="show" className="error">{errors?.email.message}</motion.div>} */}
                </div>
                <button className='btn-add-cat'>Добавить</button>
            </form>
        </div>
    </div>
  )
}

export default Category_admin