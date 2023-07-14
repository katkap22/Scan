import React, {useState} from "react";
import s from "./RequestParam.module.css";
import doc from "../../assets/images/document.svg";
import folders from "../../assets/images/folders.svg";
import imgReq from "../../assets/images/imgRequestParam.svg";
import Button from "../UI/button/Button";
import classNames from "classnames";
import {useForm} from "react-hook-form";


const RequestParam = (props) => {
    const errorDates = new Date(props.startDate).getTime() - new Date(props.endDate).getTime();

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onChange"
    });

    const onSubmit = (data) => {
        console.log('Отправлены данные из формы: ',data);
        localStorage.setItem('data', JSON.stringify(data));
        reset();
        props.searchInfo();
    }

    function validateInn(inn, error) {
        let result = false;
        if (typeof inn === 'number') {
            inn = inn.toString();
        } else if (typeof inn !== 'string') {
            inn = '';
        }
        if (!inn.length) {
            error.code = 1;
            error.message = 'ИНН пуст';
        } else if (/[^0-9]/.test(inn)) {
            error.code = 2;
            error.message = 'ИНН может состоять только из цифр';
        } else if ([10, 12].indexOf(inn.length) === -1) {
            error.code = 3;
            error.message = 'ИНН может состоять только из 10 или 12 цифр';
        } else {
            let checkDigit = function (inn, coefficients) {
                let n = 0;
                for (let i in coefficients) {
                    n += coefficients[i] * inn[i];
                }
                return parseInt(n % 11 % 10);
            };
            switch (inn.length) {
                case 10:
                    let n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if (n10 === parseInt(inn[9])) {
                        result = true;
                    }
                    break;
                case 12:
                    let n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    let n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
                        result = true;
                    }
                    break;
            }
            if (!result) {
                error.code = 4;
                error.message = 'Неправильное контрольное число';
            }
        }
        return result;
    }


    return (
        <header className={s.requestParam}>
            <div className={s.content}>
                <h1 className={s.title}>Найдите необходимые данные в пару кликов.</h1>
                <div className={s.subTitle}>
                    <div className={s.subTitleText}>
                        <p>Задайте параметры поиска.</p>
                        <p>Чем больше заполните, тем точнее поиск</p>
                    </div>
                    <div className={s.subTitleImg}>
                        <img src={doc} alt="doc" />
                        <img src={folders} alt="folders" />
                    </div>
                </div>
                <div className={s.flexRow}>

                    <form onSubmit={handleSubmit(onSubmit)}
                        className={s.formRequest}>
                        <div className={classNames(s.left, errors?.inn && s.leftError)}>
                            <label>ИНН компании<span className={errors?.inn && s.spanError}>*</span>
                                <input {...register('inn', {
                                          required: true,
                                          validate: validateInn
                                        })}
                                       className={errors?.inn && s.inputError}
                                       type="text" //в тех задании это поле дб текстовое
                                       placeholder="10 цифр"
                                />
                                <div className={s.error}>
                                    {errors?.inn && <p>{errors?.inn?.message || 'Введите корректные данные'}</p>}
                                </div>
                            </label>

                            <label>Тональность
                                <div className={s.selectWrapper}>
                                    <select {...register('selectTone')}
                                        name="select" className={s.select}>
                                        <option value="Any">Любая</option>
                                        <option value="Positive">Позитивная</option>
                                        <option value="Negative">Негативная</option>
                                    </select>
                                </div>
                            </label>

                            <label>Количество документов в выдаче<span className={errors?.countDocs && s.spanError}>*</span>
                                <input {...register('countDocs', {
                                            required: true,
                                            max: 1000,
                                            min: 1
                                        })}
                                        className={errors?.countDocs && s.inputError}
                                       type={"number"}
                                       placeholder="От 1 до 1000"
                                />
                                <div className={classNames(s.error, s.errorCountDoc)}>
                                    {errors?.countDocs && <p>Обязательное поле</p>}
                                </div>
                            </label>

                            <label>Диапазон поиска<span className={errorDates > 0  && s.spanError}>*</span>
                                <div className={s.dateWrapper}>
                                    <input type="date"
                                           {...register("startDate", {
                                               valueAsDate: new Date(props.startDate).getTime() - new Date(props.endDate).getTime() === 0,
                                           })}
                                           value={props.startDate}
                                           max={props.endDate}
                                           onChange={e => props.setStartDate(e.target.value)}
                                           className={errorDates > 0  && s.inputError}
                                           required />

                                    <input type="date"
                                           {...register("endDate")}
                                           value={props.endDate}
                                           max={new Date().toISOString().substring(0, 10)}
                                           onChange={e => props.setEndDate(e.target.value)}
                                           className={errorDates > 0 && s.inputError}
                                           required />
                                </div>
                                <div className={classNames(s.error, s.errorDate)}>
                                    {errorDates > 0 && <p>Введите корректные данные</p>}
                                </div>
                            </label>
                        </div>
                        <div className={s.right}>
                            <ul>
                                <li><input {...register('checkbox')} type="checkbox" value='maxFullness'/>Признак максимальной полноты</li>
                                <li><input {...register('checkbox')} type="checkbox" value="inBusinessNews"/>Упоминания в бизнес-контексте</li>
                                <li><input {...register('checkbox')} type="checkbox" value="onlyMainRole"/>Главная роль в публикации</li>
                                <li><input {...register('checkbox')} type="checkbox" value="onlyWithRiskFactors"/>Публикации только с риск-факторами</li>
                                <li><input {...register('checkbox')} type="checkbox" value="excludeTechNews"/>Включать технические новости рынков</li>
                                <li><input {...register('checkbox')} type="checkbox" value="excludeAnnouncements"/>Включать анонсы и календари</li>
                                <li><input {...register('checkbox')} type="checkbox" value="excludeDigests"/>Включать сводки новостей</li>
                            </ul>
                            <Button disable={isValid} className={classNames(s.searchBtn, ((errorDates < 0 || errorDates === 0) && isValid)  && s.active)}>Поиск</Button>
                            <div>* Обязательные к заполнению поля</div>
                        </div>
                    </form>


                    {/*/!*<form*!/     7710137066      Если что вернуть назад*/}
                    {/*    className={s.formRequest}*/}
                    {/*    onSubmit={handleSubmit}>*/}
                    {/*    <div className={s.left}>*/}
                    {/*        <label>ИНН компании<span>*</span>*/}
                    {/*            <input type="text" //почему текс??????????????*/}
                    {/*                   placeholder="10 цифр"*/}
                    {/*                   value={props.inn}*/}
                    {/*                   onChange={e => {*/}
                    {/*                       props.setInn(e.target.value)*/}
                    {/*                   }}*/}
                    {/*                   required />
                    {/*        </label>*/}
                    {/*        <label>Тональность*/}
                    {/*            <div className={s.selectWrapper}>*/}
                    {/*                <select name="select" className={s.select}>*/}
                    {/*                    <option value="1">Любая</option>*/}
                    {/*                    <option value="2">Позитивная</option>*/}
                    {/*                    <option value="3">Негативная</option>*/}
                    {/*                </select>*/}
                    {/*            </div>*/}
                    {/*        </label>*/}
                    {/*        <label>Количество документов в выдаче<span>*</span>*/}
                    {/*            <input type={"number"}*/}
                    {/*                   placeholder="От 1 до 1000"*/}
                    {/*                   value='1000'*/}
                    {/*                   onChange={()=> {}}*/}
                    {/*                   required />
                    {/*        </label>*/}
                    {/*        <label>Диапазон поиска<span>*</span>*/}
                    {/*            <div className={s.dateWrapper}>*/}
                    {/*                <input type="date"*/}
                    {/*                       value={props.startDate}*/}
                    {/*                       max={props.endDate}*/}
                    {/*                       onChange={e => props.setStartDate(e.target.value)}*/}
                    {/*                       className={s.inputDate}*/}
                    {/*                       required />*/}

                    {/*                <input type="date"*/}
                    {/*                       value={props.endDate}*/}
                    {/*                       max={new Date().toISOString().substring(0, 10)}*/}
                    {/*                       onChange={e => props.setEndDate(e.target.value)}*/}
                    {/*                       className={s.inputDate}*/}
                    {/*                       required />*/}
                    {/*            </div>*/}
                    {/*        </label>*/}
                    {/*    </div>*/}
                    {/*    <div className={s.right}>*/}
                    {/*        <ul>*/}
                    {/*            <li><input type="checkbox" />Признак максимальной полноты</li>*/}
                    {/*            <li><input type="checkbox" />Упоминания в бизнес-контексте</li>*/}
                    {/*            <li><input type="checkbox" />Главная роль в публикации</li>*/}
                    {/*            <li><input type="checkbox" />Публикации только с риск-факторами</li>*/}
                    {/*            <li><input type="checkbox" />Включать технические новости рынков</li>*/}
                    {/*            <li><input type="checkbox" />Включать анонсы и календари</li>*/}
                    {/*            <li><input type="checkbox" />Включать сводки новостей</li>*/}
                    {/*        </ul>*/}
                    {/*        <Button className={classNames(s.searchBtn)}>Поиск</Button>*/}
                    {/*        <div>* Обязательные к заполнению поля</div>*/}
                    {/*    </div>*/}
                    {/*</form>*/}

                    <img src={imgReq} alt="img" />
                </div>

            </div>
        </header>
    )

}

export default RequestParam;