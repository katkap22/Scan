import React, {useState} from 'react';
import s from './Resullt.module.css';
import img from '../../assets/images/imgResult.svg';
import imgDoc from '../../assets/images/imgDoc.png';
import Button from "../UI/button/Button";
import Slider from "../UI/slider/Slider";
import {v1} from "uuid";
import Loader from "../UI/loader/Loader";
import Slide from "../MainPage/Slide/Slide";
import SlideResult from "./SlideResult/SlideResult";

const Result = (props) => {
    const [slides, setSlides] = useState([
        {id: v1(), date: props.date[0], total: props.total[0], risk: props.risk[0]},
        {id: v1(), date: props.date[1], total: props.total[1], risk: props.risk[1]},
        {id: v1(), date: props.date[2], total: props.total[2], risk: props.risk[2]},
        {id: v1(), date: props.date[3], total: props.total[3], risk: props.risk[3]},
        {id: v1(), date: props.date[4], total: props.total[4], risk: props.risk[4]},
        {id: v1(), date: props.date[5], total: props.total[5], risk: props.risk[5]},
        {id: v1(), date: props.date[6], total: props.total[6], risk: props.risk[6]},
    ])


    const [slideNumbers, setSlideNumbers] = useState([0, 1, 2, 3, 4, 5, 6]);


    // const { bgUrl, content } = getContent(doc.ok.content.markup);


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
                        <p className={s.subTitleTotal}>Найдено {props.listId.length} вариантов</p>
                        <div className={s.sliderResult}>
                            {
                                <Slider
                                    slideNumbers={slideNumbers}
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

                                                   :
                                                   slideNumbers.map((slideNum, index) => {
                                                       return (
                                                           <SlideResult key={index} date={slides[slideNum].date} total={slides[slideNum].total} risk={slides[slideNum].risk}/>
                                                       )
                                                   })
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
                                props.docs.map(doc =>
                                    <div key={v1()} className={s.doc}>


                                        <header className={s.headerDoc}>
                                            <div className={s.dateDoc}>
                                                {(new Date(Date.parse(doc.ok.issueDate))).toLocaleDateString()}
                                            </div>
                                            <a href={doc.ok.url}>{doc.ok.source.name}</a>
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
                                                ? <img src={doc.ok.url} alt='image of document ' />
                                                : <img src={imgDoc} alt='image of document' />
                                        }

                                        <div className={s.contentDoc}>
                                            {
                                                [...new DOMParser().parseFromString(doc.ok.content.markup,"text/xml").getElementsByTagName("entity")].map(item =>
                                                    <span key={v1()}>{item.childNodes[0].nodeValue}</span>).slice(0, 100)
                                            }

                                        </div>

                                        <div className={s.footerDoc}>
                                            <div className={s.btnSource}>
                                                <a href={doc.ok.url}>Читать в источнике</a>
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

            <div className={s.btnResult}>
                <Button onClick={props.btnHandler}>Показать больше</Button>
            </div>


            </div>
        </div>
    );
};

export default Result;