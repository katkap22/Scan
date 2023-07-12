import React from 'react';
import s from './Button.module.css';
import classNames from "classnames";

const Button = ({children, className, ...props}) => {
    return (
        <button {...props} type='submit' className={classNames(s.btn, className)}>
            {children}
        </button>
    );
};

export default Button;