import React from "react";
import s from "./Main.module.css";
import CardTariff from "../MainNotAuthorizedUser/CardTariff/CardTariff";

const Main = () => {
    return (
        <main className={s.main} id="#main">
            <div className="content">
                <div className="title">
                    <div className="leftSide">
                        <h1>сервис по поиску публикаций о компании по его ИНН</h1>
                        <div>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</div>
                    </div>
                    <div className="rightSide">
                        <img src="" alt=""/>
                    </div>
                </div>
                <div className="becouse">
                    <h2>Почему именно мы</h2>
                    <div>slider</div>
                    <div><img src="" alt=""/></div>
                </div>
                <div className="price">
                    <div className="row">
                        <CardTariff />
                        <CardTariff />
                        <CardTariff />
                    </div>
                </div>
            </div>
        </main>
    )

}

export default Main;