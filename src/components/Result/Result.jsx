import React, {useEffect, useState} from 'react';
import s from './Resullt.module.css';
import img from '../../assets/images/imgResult.svg';
import imgDoc from '../../assets/images/imgDoc.png';
import Button from "../UI/button/Button";
import Slider from "../UI/slider/Slider";
import {v1} from "uuid";
import Loader from "../UI/loader/Loader";
import Slide from "../MainPage/Slide/Slide";
import SlideResult from "./SlideResult/SlideResult";
import classNames from "classnames";
import {isDisabled} from "@testing-library/user-event/dist/utils";

const Result = (props) => {

    const [slides, setSlides] = useState([])
        // {id: v1(), date: JSON.parse(localStorage.getItem('date'))[0], total: JSON.parse(localStorage.getItem('total'))[0], risk: JSON.parse(localStorage.getItem('risk'))[0]},
        // {id: v1(), date: JSON.parse(localStorage.getItem('date'))[1], total: JSON.parse(localStorage.getItem('total'))[1], risk: JSON.parse(localStorage.getItem('risk'))[1]},
        // {id: v1(), date: JSON.parse(localStorage.getItem('date'))[2], total: JSON.parse(localStorage.getItem('total'))[2], risk: JSON.parse(localStorage.getItem('risk'))[2]},
        // {id: v1(), date: JSON.parse(localStorage.getItem('date'))[3], total: JSON.parse(localStorage.getItem('total'))[3], risk: JSON.parse(localStorage.getItem('risk'))[3]},
        // {id: v1(), date: JSON.parse(localStorage.getItem('date'))[4], total: JSON.parse(localStorage.getItem('total'))[4], risk: JSON.parse(localStorage.getItem('risk'))[4]},
        // {id: v1(), date: props.date[0], total: props.total[0], risk: props.risk[0]},
        // {id: v1(), date: props.date[1], total: props.total[1], risk: props.risk[1]},
        // {id: v1(), date: props.date[2], total: props.total[2], risk: props.risk[2]},
    const [slideNumbers, setSlideNumbers] = useState([]);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('date')) &&
            JSON.parse(localStorage.getItem('total')) &&
            JSON.parse(localStorage.getItem('risk'))) {
                const count = JSON.parse(localStorage.getItem('date')).length;
                console.log(count);
                const result = [];

                for (let i = 0; i < count; i++ ) {
                    const obj = {
                        id: v1(),
                        date: JSON.parse(localStorage.getItem('date'))[i],
                        total: JSON.parse(localStorage.getItem('total'))[i],
                        risk: JSON.parse(localStorage.getItem('risk'))[i]
                    }
                    result.push(obj);
                    console.log(result);
                }
                setSlides(result);

                const countSlides = JSON.parse(localStorage.getItem('date'));
                const numberSlide = countSlides.map((item, index) => index);
                setSlideNumbers([...numberSlide]);
        }
    }, []);
console.log(slides);
    // const date = JSON.parse(localStorage.getItem('date'));
    // const total = JSON.parse(localStorage.getItem('total'));
    // const risk = JSON.parse(localStorage.getItem('risk'));



    // const { bgUrl, content } = getContent(doc.ok.content.markup);

    const [currentPage, setCurrentPage] = useState([]); //массив публикаций на странице (макс 10)
    const [countPages, setCountPages] = useState(0);
    
    // useEffect(() => {debugger
    //     if (JSON.parse(localStorage.getItem('docs'))) {
    //         const docs = JSON.parse(localStorage.getItem('docs')); //Например пришло 100 публикаций
    //         if (docs.length > 10) {
    //             setCountPages(Math.ceil(docs.length / props.limit)); //100/10 = 10 страниц
    //         } else {
    //             setCountPages(docs.length)
    //         }
    //     }
    // }, [props.docs])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('docs'))) {

        const currentPage = JSON.parse(localStorage.getItem('docs')).slice(0, props.offset + props.limit);
        setCurrentPage([...currentPage]);
    }
                // setCountPages(countPages - 1);

    }, [props.offset]);


    return (
        <div className={s.result}>
            <div className={s.content}>

                <div className={s.headerResult}>
                    <div className={s.wrapperTitle}>
                        <h1 className={s.title}>Ищем. Скоро будут результаты</h1>
                        <p className={s.subTitle}>Поиск может занять некоторое время, просим сохранять терпение.</p>
                    </div>
                    <img src={img} alt='woman'/>
                </div>

                <div className={s.mainResult}>
                    <div className={s.total}>
                        <h3 className={s.titlesMainResult}>Общая сводка</h3>
                        <p className={s.subTitleTotal}>Найдено {JSON.parse(localStorage.getItem('listId')) && JSON.parse(localStorage.getItem('listId')).length} вариантов</p>
                        <div className={s.sliderResult}>
                            {
                                <Slider
                                    slideNumbers={slideNumbers} //не крутиться слайдер!!!
                                    slides={slides}
                                    setSlides={setSlides}
                                    setSlideNumbers={setSlideNumbers}>

                                       <div className={s.sliderWrapper}>
                                           <div className={s.static}>
                                               <p>Период</p>
                                               <p>Всего</p>
                                               <p>Риски</p>
                                           </div>

                                           {
                                               props.isLoading
                                                   ? <div className={s.loaderWrapper}>
                                                       <Loader />
                                                       <div className={s.loaderText}>Загружаем данные</div>
                                                   </div>

                                                   : slideNumbers.map((slideNum, index) =>
                                                           <SlideResult key={index} date={slides[slideNum].date} total={slides[slideNum].total} risk={slides[slideNum].risk}/>
                                                   )
                                           }
                                       </div>

                                </Slider>
                            }
                        </div>
                    </div>
                    <div className={s.listDoc}>
                        <h3 className={s.titlesMainResult}>Список документов</h3>
                        <div className={s.docs}>

                            {
                                currentPage.map(doc =>
                                    <div key={v1()} className={s.doc}>
                                        
                                        <header className={s.headerDoc}>
                                            <div className={s.dateDoc}>
                                                {(new Date(Date.parse(doc.ok.issueDate))).toLocaleDateString()}
                                            </div>
                                            <a href={doc.ok.url} target='_blank' rel="noreferrer">{doc.ok.source.name}</a>
                                        </header>

                                        <h3 className={s.titleDoc}>{doc.ok.title.text}</h3>

                                        {
                                            doc.ok.attributes.isTechNews
                                                ? <div className={s.tegDoc}>
                                                    <p>Tехнические новости</p>
                                                  </div>
                                                : doc.ok.attributes.isAnnouncement
                                                    ? <div className={s.tegDoc}>
                                                        <p>Анонсы и события</p>
                                                      </div>
                                                    : doc.ok.attributes.isDigest
                                                        ? <div className={s.tegDoc}>
                                                            <p>Сводки новостей</p>
                                                          </div>
                                                        : ''
                                        }

                                        {
                                            doc.ok.src
                                                ? <img src={doc.ok.url} alt='document ' />
                                                : <img src={imgDoc} alt='document' />
                                        }

                                        <div className={s.contentDoc}>
                                            {
                                                [...new DOMParser().parseFromString(doc.ok.content.markup,"text/xml").getElementsByTagName("entity")].map(item =>
                                                    <span key={v1()}>{item.childNodes[0].nodeValue}</span>).slice(0, 100)
                                            }

                                        </div>

                                        <div className={s.footerDoc}>
                                            <div className={s.btnSource}>
                                                <a href={doc.ok.url} target='_blank' rel="noreferrer">Читать в источнике</a>
                                            </div>
                                            <div className={s.countWords}>
                                                <p>{doc.ok.attributes.wordCount} слов</p></div>
                                        </div>
                                        
                                    </div>
                                )
                        }

                        </div>
                    </div>
                </div>

            <div className={classNames(s.btnResult, props.isCompleted && s.completed)}>
                <Button disable={true} onClick={props.btnHandler}>Показать больше</Button>
            </div>


            </div>
        </div>
    );
};

export default Result;