import React from "react";
import s from "./RequestParam.module.css";
import doc from "../../assets/images/document.svg";
import folders from "../../assets/images/folders.svg";
import imgReq from "../../assets/images/imgRequestParam.svg";
import Button from "../UI/button/Button";
import classNames from "classnames";


const RequestParam = () => {


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
                    <form className={s.formRequest}
                          onSubmit={()=> alert('sdf')}>
                        <div className={s.left}>
                            <label>ИНН компании<span>*</span>
                                <input type="text"
                                       placeholder="10 цифр" required /> {/*//дб валидация!!!*/}
                            </label>
                            <label>Тональность
                                <div className={s.selectWrapper}>
                                    <select name="select" className={s.select}>
                                        <option value="1">Любая</option>
                                        <option value="2">Позитивная</option>
                                        <option value="3">Негативная</option>
                                    </select>
                                </div>
                            </label>
                            <label>Количество документов в выдаче<span>*</span>
                                <input type={"number"}
                                       placeholder="От 1 до 1000" required /> {/*//валидация!!!*/}
                            </label>
                            <label>Диапазон поиска<span>*</span>
                                <div className={s.dateWrapper}> {/*даты не дб в будущем ва и дата нач не мб позже даты конца*/}
                                    <input type="date"
                                        // value="Дата начала"
                                           className={s.inputDate}
                                           required />

                                    <input type="date"
                                           placeholder="Дата конца"
                                           className={s.inputDate}
                                           required />
                                </div>
                            </label>
                        </div>
                        <div className={s.right}>
                            <ul>
                                <li><input type="checkbox" />Признак максимальной полноты</li>
                                <li><input type="checkbox" />Упоминания в бизнес-контексте</li>
                                <li><input type="checkbox" />Главная роль в публикации</li>
                                <li><input type="checkbox" />Публикации только с риск-факторами</li>
                                <li><input type="checkbox" />Включать технические новости рынков</li>
                                <li><input type="checkbox" />Включать анонсы и календари</li>
                                <li><input type="checkbox" />Включать сводки новостей</li>
                            </ul>

                            {/*<button className={s.searchBtn}>Поиск</button>*/}
                            <Button className={classNames(s.searchBtn)}>Поиск</Button>
                            <div>* Обязательные к заполнению поля</div>
                        </div>
                    </form>
                    <img src={imgReq} alt="img" />
                </div>

            </div>
        </header>
    )

}

export default RequestParam;