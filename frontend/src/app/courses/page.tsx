"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Loader from "../../../public/loader/Loader";
import { useCategory, useCourses } from "store/useCourses";
import { motion } from "framer-motion";

const page = () => {
  const router = useRouter();

  const { loading, error, fetchCourses } = useCourses((state) => ({
    loading: state.loading,
    error: state.error,
    fetchCourses: state.fetchCourses,
  }));

  const {
    categories,
    loading: Loading,
    error: Error,
    fetchCategory,
  } = useCategory((state) => ({
    loading: state.loading,
    categories: state.categories,
    error: state.error,
    fetchCategory: state.fetchCategory,
  }));

  const [catId, setCatId] = useState(0);

  const courses = useCourses((state) => {
    switch (catId) {
      case 1:
        return state.courses.filter((item) => item.category_id === 1);
      case 2:
        return state.courses.filter((item) => item.category_id === 2);
      case 3:
        return state.courses.filter((item) => item.category_id === 3);
      default:
        return state.courses;
    }
  });

  useEffect(() => {
    fetchCourses();
    fetchCategory();
  }, []);

  const countCourse = courses.length;

  const handleCategoryClick = (id: number) => {
    setCatId(id);
  };
  const handleAllCoursesClick = (id: number) => {
    setCatId(id);
  };

  const variantsCourses = {
    hidden: {
      opacity: 0,
      transform: "scale(0)",
    },
    visible: (i: number) => ({
      opacity: 1,
      transform: "scale(1)",
      transition: {
        delay: i * 0.3,
      },
    }),
  };

  const variantsCategory = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
      },
    }),
  };

  return (
    <div className="courses" id="page-wrap">
      <h1 className="zag h1__courses">Наши курсы</h1>
      <div className="row__courses">
        <div className="category category__courses">
          <button
            className={catId === 0 ? "cat-el active" : "cat-el"}
            onClick={() => handleAllCoursesClick(0)}
          >
            Все курсы
          </button>
          {Loading ? (
            <div className="wrapper-loader">
              <Loader />
            </div>
          ) : (
            categories.map((cat, i) => {
              return (
                <motion.button
                  key={cat.id}
                  variants={variantsCategory}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className={catId === cat.id ? "cat-el active" : "cat-el"}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.name}
                </motion.button>
              );
            })
          )}
        </div>
        <motion.p
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="count-courses"
        >
          Всего курсов: {countCourse}
        </motion.p>
      </div>
      <div className="courses__block">
        {loading ? (
          <div className="wrapper-loader">
            <Loader />
          </div>
        ) : (
          courses?.map((course, i) => {
            return (
              <motion.div
                animate="visible"
                variants={variantsCourses}
                initial={"hidden"}
                custom={i}
                className="block-course"
                key={course.id}
              >
                <div className="img_block-course">
                  <Image
                    src="/images/foto_course.jpg"
                    alt=""
                    width={635}
                    height={365}
                  />
                </div>
                <div className="content_block-course">
                  <div className="name-course">{course.name}</div>
                  <p className="text-course">{course.description}</p>
                  <div className="row-course-block">
                    <p className="category-name">Для начинающих</p>
                    <button
                      onClick={() => router.push(`/course/${course.id}`)}
                      className="more-course"
                    >
                      <Image
                        src="/images/arrowCourse.png"
                        width={8}
                        height={13}
                        alt="arrow"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default page;
