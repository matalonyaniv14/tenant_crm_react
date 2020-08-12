import React from 'react';

import style from './style.module.css';
import PaymentBox from '../PaymentBox/PaymentBox';

const EarningsCard = () => {
    return (
        <div className={style.earningsWrap}>
            <div className={style.earningsHeader} id='header'>
                <p>Earnings All Time</p>
            </div>
            <div className={style.earningsContent}>
                <PaymentBox title='title' value='100'/>
                <PaymentBox title='title' value='100'/>
                <PaymentBox title='title' value='100'/>
            </div>
        </div>);
}

export default EarningsCard;