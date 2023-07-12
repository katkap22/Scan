import React, {useState} from "react";
import s from "./MainPage.module.css";
import classNames from "classnames";
import title from "../../assets/images/titleRightSide.svg";
import icon1 from "../../assets/images/iconWhy1.svg";
import icon2 from "../../assets/images/iconWhy2.svg";
import icon3 from "../../assets/images/iconWhy3.svg";
import imgWhy from "../../assets/images/imgWhy.svg";
import CardTariff from "./CardTariff/CardTariff";
import {v1} from "uuid";
import {NavLink} from "react-router-dom";
import Button from "../UI/button/Button";
import Slider from "../UI/slider/Slider";
import Slide from "./Slide/Slide";

const MainPage = (props) => {

    const [slides, setSlides] = useState([
        {id: v1(), icon: icon1, text: "Высокая и оперативная скорость обработки заявки"},
        {id: v1(), icon: icon2, text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос "},
        {id: v1(), icon: icon3, text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству "},
        {id: v1(), icon: icon1, text: "Высокая и оперативная скорость обработки заявки СЛАЙД № 4"},
        {id: v1(), icon: icon2, text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос  СЛАЙД № 5"},
        {id: v1(), icon: icon3, text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству  СЛАЙД № 6"}
    ]);
    const [slideNumbers, setSlideNumbers] = useState([0, 1, 2]);


    return (

        <main className={s.main}>

                <section className={s.title}>
                    <div className={s.content}>
                        <div className={s.rowTitle}>
                            <div className={classNames(s.leftSide, s.titleMain)}>
                                <h1>сервис по поиску <br/> публикаций<br/> о компании<br/> по его ИНН</h1>
                                <div>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                                </div>

                                {
                                    props.isLoggedin &&
                                    // <NavLink to="/RequestParam">
                                    //     <button className={s.requestBtn}>
                                    //         Запросить данные
                                    //     </button>
                                    // </NavLink>

                                    <NavLink to="/RequestParam">
                                        <Button className={classNames(s.requestBtn)} >
                                          Запросить данные
                                        </Button>
                                    </NavLink>

                                }
                            </div>
                            <div className={s.rightSide}>
                                <img src={title} alt="happy man"/>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={s.why}>

                    <div className={s.content}>
                        <h2>Почему именно мы</h2>
                    </div>
                        <Slider
                            slideNumbers={slideNumbers}
                            slides={slides}
                            setSlides={setSlides}
                            setSlideNumbers={setSlideNumbers}
                        >

                            {
                                slideNumbers.map((slideNum, index) => {
                                    return (
                                        <Slide key={index} icon={slides[slideNum].icon} text={slides[slideNum].text}/>
                                        // <SlideResult key={index} date={props.date} total={props.total} risk={props.risk}/>
                                    )
                                })
                            }

                        </Slider>
                    <div className={s.imgWhy}>
                        <img src={imgWhy} alt="Happy man #2"/>
                    </div>

                </section>

                <section className={s.tariffs}>
                    <div className={s.content}>
                        <h2>наши тарифы</h2>
                        <ul className={s.tariffList}>
                            <li className={s.tariff}>
                                <CardTariff
                                    title="Beginner"
                                    subTitle="Для небольшого исследования"
                                    discountPrice="799"
                                    price="1 200"
                                    creditPrice="150"
                                    tariff='1'
                                />
                            </li>
                            <li className={s.tariff}>
                                <CardTariff title="Pro"
                                            subTitle="Для HR и фрилансеров"
                                            discountPrice="1 299"
                                            price="2 600"
                                            creditPrice="279"
                                            tariff='2'
                                />
                            </li>
                            <li className={s.tariff}>
                                <CardTariff title="Business"
                                            subTitle="Для корпоративных клиентов"
                                            discountPrice="2 379"
                                            price="3 700"
                                            tariff='3'
                                />
                            </li>
                        </ul>
                    </div>


                </section>

        </main>
    )

}

export default MainPage;