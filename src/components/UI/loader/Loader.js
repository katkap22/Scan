import React from 'react';
import s from './Loader.module.css';
import loader from '../../../assets/images/spinner.svg';

const Loader = () => {
    return (
       <img className={s.loader} src={loader} alt='loading'/>
    );
};

export default Loader;