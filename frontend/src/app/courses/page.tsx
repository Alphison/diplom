"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {useState} from "react";
import { useCourses } from "hooks/useCourses";
import Loader from '../../../public/loader/Loader'
import { useCategory } from "hooks/useCategories";


const page = () => {
  const router = useRouter();
  // const [categoryCourses, setCategories] = useState() 

  const { courses, isSuccess, isLoading } = useCourses()
  const { categories, isSuccess:Success, isLoading:Loading} = useCategory()

  const countCourse = courses?.data.data?.length

  // const handleCategoryClick = (id:number) => {
  //   setCategories(courses?.data.data?.filter(item => item.category_id === id))
  // }

  return (
    <div className="courses">
      <h1 className="zag h1__courses">Наши курсы</h1>
      <div className="row__courses">
        <div className="category category__courses">
          <button className="cat-el">
            Все курсы
          </button>
          {
            categories?.data.data?.map((cat) => {
              return(
                <button className="cat-el" onClick={() => handleCategoryClick(cat.id)}>
                  {cat.name}
                </button>
              )
            })
          }
        </div>
        <p className="count-courses">Всего курсов: {countCourse}</p>
      </div>
      <div className="courses__block">
      {
      isLoading ? <div className="wrapper-loader"><Loader /></div> :
      
      isSuccess &&
      courses?.data.data?.map((course) => {
          return (
            <div className="block-course">
              <div className="buttons__block">
                <a
                  href="?edit=<?=$course['id_course']?>"
                  className="button__block"
                >
                  <Image src="/images/edit.png" alt="" width={20} height={20} />
                </a>
                <div
                  data-id="?courses&delete=<?=$course['id_course']?>"
                  className="button__block delete_modal_btn"
                >
                  <Image
                    src="/images/trash.png"
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </div>

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
                <div className="row_block-course">
                  <p className="time">
                    <Image
                      src="/images/clock-outline.png"
                      alt=""
                      width={20}
                      height={20}
                    />
                    5 месяцев
                  </p>
                  <p className="status">
                    <Image
                      src="/images/ikon.png"
                      alt=""
                      width={20}
                      height={20}
                    />
                    Для начинающих
                  </p>
                </div>
                <p className="text-course">{course.description}</p>
                <p className="price-course">{course.price} ₽</p>
                <button
                  onClick={() => router.push(`/course/${course.id}`)}
                  className="more-course"
                >
                  ПОДРОБНЕЕ
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
