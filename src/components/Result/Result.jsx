import React from 'react';
import s from './Resullt.module.css';
import img from '../../assets/images/imgResult.svg';
import Button from "../UI/button/Button";

const Result = () => {
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
                        <p className={s.subTitleTotal}>Найдено 4 221 вариантов</p>
                        <div className={s.sliderResult}>
                            Здесь будет СЛАЙДЕР
                        </div>
                    </div>
                    <div className={s.listDoc}>
                        <h3 className={s.titlesMainResult}>Список документов</h3>
                        <div className={s.docs}>
                            Здесь будут карточки с НАЙДЕННЫМИ ДОКУМЕНТАМИ
                        </div>
                    </div>
                </div>

            <div className={s.btnResult}>
                <Button>Показать больше</Button>
            </div>


            </div>
        </div>
    );
};

export default Result;