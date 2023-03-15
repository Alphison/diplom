import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "public/loader/Loader";
import { FC } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CourseType } from "types/type";

export interface CourseList {
  courses: CourseType[] | undefined;
  isSuccess: boolean;
  isLoading: boolean;
}

const Slider: FC<CourseList> = ({ courses, isSuccess, isLoading }) => {
  const router = useRouter();

  return (
    <>
      {isLoading ? (
        <div className="wrapper-loader">
          <Loader />
        </div>
      ) : (
        <Swiper
          slidesPerView={2}
          spaceBetween={24}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {isSuccess &&
            courses?.map((course) => (
              <SwiperSlide key={course.id}>
                <div className="block-course">
                  <div className="buttons__block">
                    <a
                      href="?edit=<?=$course['id_course']?>"
                      className="button__block"
                    >
                      <Image
                        src="/images/edit.png"
                        alt=""
                        width={20}
                        height={20}
                      />
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
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </>
  );
};

export default Slider;
