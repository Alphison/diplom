"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import { useCourse } from 'store/useCourse'

const LayoutCourseEducation = ({children}: {
    children: React.ReactNode,
  }) => {

    // const {course, loading, error, fetchCourse} = useCourse(state => ({
    //     course: state.course,
    //     loading: state.loading,
    //     error: state.error,
    //     fetchCourse: state.fetchCourse
    // }))

    // useEffect(() => {
    //     fetchCourse(id)
    //   }, [])

  return (
    <div className='course-education' id='page-wrap'>
        <div className="menu__course-education">
            <div className="sub-block__course-education">
                <div className="img-block__sub-block">
                    <Image src={'/images/foto_course.jpg'} width={100} height={100} alt=''/>
                </div>
                <div className="subinfo__course-education">
                    <h3 className="subname__course-education">
                        Курс
                    </h3>
                    <p className="subname2__course-education">
                        Beginning 3D Game Development
                    </p>
                </div>
            </div>
            <div className="menu-content__course-education">
                <div className="block-menu__course-education">
                    <div className="img-block__sub-block">
                        <Image src={'/images/foto_course.jpg'} width={100} height={100} alt=''/>
                    </div>
                    <div className="subinfo__course-education">
                        <h3 className="subname__course-education">
                            Урок
                        </h3>
                        <p className="subname2__course-education">
                            Beginning 3D Game Development
                        </p>
                    </div>
                </div>
                <div className="block-menu__course-education">
                    <div className="img-block__sub-block">
                        <Image src={'/images/foto_course.jpg'} width={100} height={100} alt=''/>
                    </div>
                    <div className="subinfo__course-education">
                        <h3 className="subname__course-education">
                            Урок
                        </h3>
                        <p className="subname2__course-education">
                            Beginning 3D Game Development
                        </p>
                    </div>
                </div>
                <div className="block-menu__course-education">
                    <div className="img-block__sub-block">
                        <Image src={'/images/foto_course.jpg'} width={100} height={100} alt=''/>
                    </div>
                    <div className="subinfo__course-education">
                        <h3 className="subname__course-education">
                            Курс
                        </h3>
                        <p className="subname2__course-education">
                            Beginning 3D Game Development
                        </p>
                    </div>
                </div>
            </div>
        </div>
        {children}
    </div>
  )
}

export default LayoutCourseEducation