import React from 'react';

import style from './style.module.css';
import PaymentBox from '../PaymentBox/PaymentBox';

const YearlyOverview = ( { months }) => {
    return months.map( ( month, k ) => {
        return ( <div key={k} className={style.overviewMonth}>
                    <p>1</p>
                </div> );
    })
}


const TenantCard = () => {
    return (
        <div className={style.cardWrap}>
            <div className={style.cardContent}>
                {/* header */}
                <div className={style.cardHeader}>
                    <p id='header'>2115 E 70th</p>
                    <p id='subHeader'>$800</p>
                </div>
                {/* paymentInfo */}
                <div className={style.cardPaymentInfo}>
                    <PaymentBox title='Test Title1' value='$700'/>
                    <PaymentBox title='Test Title2' value='$701'/>
                    <PaymentBox title='Test Title3' value='$702'/>
                </div>
                {/* yearly overview */}
                <div className={style.yearlyOverview}>
                    <div className={style.overviewHeader}>
                        <p>Yearly Overview</p>
                    </div>
                    <div className={style.overviewMonths}>
                        <YearlyOverview months={ [1,2,3,4,5,6] }/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TenantCard;
