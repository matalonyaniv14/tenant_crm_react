import React from 'react';

import style from './style.module.css';

const PaymentBox = ( { title, value } ) => {
    return (
        <div className={style.paymentWrap}>
            <div className={style.paymentHeader}>
                <p>{ title }</p>
            </div>
            <div className={style.paymentValue}>
                <p>{ value }</p>
            </div>
        </div>
    );
}

export default PaymentBox;