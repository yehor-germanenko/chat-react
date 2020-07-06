import React from 'react';
import s from "./Preloader.module.css"
import classNames from 'classnames';

let Preloader = () => {
    return <div className={s.container}>
        <div className={classNames(s.dash, s.uno)}></div>
        <div className={classNames(s.dash, s.dos)}></div>
        <div className={classNames(s.dash, s.tres)}></div>
        <div className={classNames(s.dash, s.cuatro)}></div>
  </div>
}

export default Preloader;