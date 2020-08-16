import React from 'react';

import style from './style.module.css';
import PaymentBox from '../PaymentBox/PaymentBox';

const EarningsCard = ( { totalDue=0, totalPayed=0, balanceOwed=0 } ) => {

    return (
        <div className={style.earningsWrap}>
            <div className={style.earningsHeader} id='header'>
                <p>Earnings All Time</p>
            </div>
            <div className={style.earningsContent}>
                <PaymentBox title='Total Due' value={ totalDue }/>
                <PaymentBox title='Total Payed' value={ totalPayed }/>
                <PaymentBox title='Balance Owed' value={ balanceOwed }/>
            </div>
        </div>);
}

export default EarningsCard;