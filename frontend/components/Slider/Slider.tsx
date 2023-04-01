import { useContext, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import Model from "components/model/model";
import { MyContext } from "components/Header/MyProvider";

const slides = [
  {
    id: 1,
    img: "/images/star_planet.jpg",
  },
  {
    id: 2,
    img: "https://f.vividscreen.info/soft/6f0c8f75ee9193799545569a5c8dd021/Itachi-Uchiha-1920x1080.jpg",
  },
  {
    id: 3,
    img: "https://vsthemes.org/uploads/posts/2021-07/1625588298_1040994.webp",
  },
];

function App() {
  const [cameraRotation, setCameraRotation] = useState(360);
  const [allSlide, setAllSlide] = useState(0);
  const [disabledNext, setDisabledNext] = useState(false);
  const [disabledPrev, setDisabledPrev] = useState(false);
  const [active, setActive] = useState(0);
  const x = useMotionValue(allSlide);

  const handleClickNext = () => {
    const setAllSlideTime = () => {
      setAllSlide((prev) => {
        if (prev !== -100) {
          return prev - 50;
        } else {
          return prev;
        }
      });
    }

    setTimeout(setAllSlideTime, 1000)

    switch (allSlide) {
      case 0:
        setActive(0);
      case (-50):
        setActive(prev => prev + 1);
          break
      case (-100):
        setActive(prev => prev + 1);
          break
    }
  };

  const handleClickPrev = () => {
    const setAllSlideTime = () => {
      setAllSlide((prev) => {
        if (prev !== 0) {
          return prev + 50;
        } else {
          return prev;
        }
      });
    }

    setTimeout(setAllSlideTime, 1000)
    
    switch (allSlide) {
      case 0:
        setActive(0);
      case (-50):
        setActive(prev => prev - 1);
          break
      case (-100):
        setActive(prev => prev - 1);
          break
    }
  };

  useEffect(() => {
    if (allSlide === -100) {
      setDisabledNext(true);
    } else {
      setDisabledNext(false);
    }
    if (allSlide === 0) {
      setDisabledPrev(true);
    } else {
      setDisabledPrev(false);
    }
  }, [allSlide]);

  const ctx = useContext(MyContext)

  return (
    <div className="App" id="page-wrap">
      <div className="window">
        <div
          className="all_slide"
          style={{
            transform: `translateX(${allSlide}%) scale(0.5)`,
            // gap: `${gap}%`
          }}
        >
          {slides.map((item, i) => {
            return (
              <div className={active === i ? "slide active" : "slide"}>
                <div style={{  background: 'black', opacity: '0.4', width: '100%', height: '100%', position: 'absolute'}}></div>
                <img src={item.img} />
                <div className="content-slide">
                  <div className="col-content-slide">
                      <h1 className="slide-name">LOWPOLI</h1>
                      <div className="info-slide">
                        <div className="block-info">
                          <p className="text-block-info">Преподаватель</p>
                          <h2 className="h2-block-info">ВИКТОР КОТОВ</h2>
                          <p className="text-block-info">3D-художник, дизайнер существ, скульптор Zbrush. Работает подрядчиком в ID Software. Работал с Mail.ru, Inquake, RJ-games, Geeks, DAGGER CROWN STUDIO.</p>
                        </div>
                        <div className="block-info">
                            <div className="row_slider-cours">
                                <div className="column_home-cours">
                                    <div className="circule"></div>
                                    <label className="text-col_home-course">
                                        <p>Уровень знаний</p>
                                        <p>нормальный</p>
                                    </label>
                                </div>
                                <div className="column_home-cours">
                                    <div className="circule"></div>
                                    <label className="text-col_home-course">
                                        <p>Продолжительность</p>
                                        <p>10 месяцев</p>
                                    </label>
                                </div>
                            </div>
                            <Link href={'#'} className={'btn-slide'}>Подробнее</Link>
                        </div>
                        <div className="block-info">
                          <p className="text-block-info">Освой профессию под руководством лидеров индустрии, которые работали над World Of Tanks, Mortal Shell, «всем известной тундры» и Блицкриг 3, и стань востребованным 3D-художником, который без труда найдёт работы в игровой студии.</p>
                        </div>
                      </div>
                  </div>
                  <div className="col-content-slide">
                    <div className="blur-model"></div>
                    <Model />
                    <div className="circle-model"></div>
                    <div className="circle-model2"></div>
                    <h2 className="inner-block-circle">{cameraRotation}°</h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="arrows">
          <div className="ikons_slider">
            <a href="#" className="ikon-slider"><Image src="/images/twitter.png" width={35} height={35} alt="twiiter"/></a>
            <a href="#" className="ikon-slider"><Image src="/images/inst.png" width={35} height={35} alt="inst"/></a>
            <a href="#" className="ikon-slider"><Image src="/images/Facebook.png" width={35} height={35} alt="Facebook"/></a>
          </div>
          <div className="buttons_slider">
            <button
              className="arrow"
              disabled={disabledPrev}
              onClick={() => handleClickPrev()}
            >
              <AiOutlineArrowLeft />
            </button>
            <button
              className="arrow"
              disabled={disabledNext}
              onClick={() => handleClickNext()}
            >
              <AiOutlineArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
