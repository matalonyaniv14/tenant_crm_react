import React from 'react';
import cx from 'classnames';


import style from './style.module.css';
import PaymentBox from '../PaymentBox/PaymentBox';
import {formatKey, toCurrency} from '../../Utils/utils';
import { Link } from 'react-router-dom';


const YearlyOverview = ( { months }) => {
    return months.map( ( _month, k ) => {
        if ( k > 3 ) return;

        const { month, payed_in_full } = _month; 
        
        return ( 
                <div key={k} 
                     className={ cx( style.overviewMonth, { [style.unpaid]: !payed_in_full }  ) }>
                    <p> { month } </p>
                </div> 
                );
    })
}


const TenantCard = ( props ) => {
    const { address, 
            monthly_payment,
            snapshot,
            payment_history,
            id } = props;



    return (
        <div className={style.cardWrap}>
            <div className={style.cardContent}>
                {/* header */}
                <Link to={ (l) => ( {...l, pathname: `/tenant/${ id }`} ) }>    
                    <div className={style.cardHeader}>
                        <p id='header'>{ address }</p>
                        <p id='subHeader'>{ toCurrency( monthly_payment ) }</p>
                    </div>
                </Link>
                {/* paymentInfo */}
                <div className={style.cardPaymentInfo}>
                    { 
                        Object.keys( snapshot )
                            .map( ( key, k ) => {
                                return  <PaymentBox key={ k } 
                                                    title={ formatKey( key ) } 
                                                    value={ snapshot[key] } />
                            }) 
                    }
                </div>
                {/* yearly overview */}
                <div className={style.yearlyOverview}>
                    <div className={style.overviewHeader}>
                        <p>Yearly Overview</p>
                    </div>
                    <div className={style.overviewMonths}>
                        <YearlyOverview months={ payment_history }/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TenantCard;
