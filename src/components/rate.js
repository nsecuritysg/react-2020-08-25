import React from 'react';
import style from './rate.module.css';

export default function Rate(props) {
  return (
    <div>
      <p className={style.user}>{props.review.user}</p>
      <p className={style.text}>{props.review.text}</p>
      <p className={style.rating}>{props.review.rating} points</p>
    </div>
  );
}
