import React from 'react';
import {
    Link,
    useRouteMatch,
    useParams,
    useHistory
} from "react-router-dom";
import { useState } from 'react';
import cx from 'classnames';

import Spinner from '../../Components/Spinner/Spinner';
import Fetch, { BASE_PATH } from '../../Utils/Fetch';
import { takeBalanceOwed, sortBy } from '../../Utils/utils';
import EarningsCard from '../../Components/EarningsCard/EarningsCard';
import MonthCard from '../../Components/MonthCard/MonthCard';
import  TenantInfo  from '../../Components/TenantInfo/TenantInfo';



const MAX_YEAR = 2026;
const MIN_YEAR = new Date().getFullYear();

const takeTotalEarnings = ( paymentHistory, monthlyPayment ) => {
    let totalDue, totalPayed, balanceOwed, paymentDueUntilToday;
    paymentDueUntilToday =  paymentHistory.filter( month => month.month <= new Date().getMonth() )

    totalDue = paymentDueUntilToday.length * monthlyPayment;
    totalPayed = paymentDueUntilToday
                    .map( month => month.total_payed )
                    .reduce( ( total, curr ) => total += curr );

    balanceOwed =  takeBalanceOwed(totalPayed, totalDue);

    return { totalDue, totalPayed, balanceOwed };
}



const ToggleYear = ( { year, callback } ) => {
    
    return (
        <div className='toggleYearWrap'>
           <div className={cx('toggleYearToggler', {['disabled']: year >= MAX_YEAR })}>
                <p onClick={ () => callback('ADD') }  >+</p>
            </div>
            <p style={{fontWeight: 'bold', fontSize: '25px', marginTop: '5px'}}>
                 {year} 
            </p>
           <div className={cx('toggleYearToggler', { ['disabled']: year <= MIN_YEAR })}>
                <p onClick={ () => callback('MINUS') }>-</p>
            </div>
        </div>
    );
}




const TenantScreen = () => {
    const history = useHistory();
    const{ tenantId } = useParams()
    const [_, setState ] = useState(null);
    const [ year, setYear ] = useState(new Date().getFullYear()) - 2;
    const [ infoShown, setInfoShown ] = useState(false);
    
    const forceUpdate = () => {
        setState({});
    }
    
    
    const _setYear = ( direction ) => {
        let currentYear = year
        if ( direction === 'ADD' ) {
            if ( ++currentYear > MAX_YEAR ) return;

            setYear(currentYear);
        } else if ( direction === 'MINUS' ) {
            if ( --currentYear < MIN_YEAR ) return;

            setYear(currentYear);
        }
        
    }


    const handleDelete = () => {
       let confirm =  window.confirm('You are about to delete this tenant...Are you sure?');
       if ( confirm ) {
           fetch(`${BASE_PATH}/tenants/${tenantId}`, {method: 'DELETE'})
                .then(_ => history.push('/tenants') )
       }
    }


    return (
        <div>
            <Fetch path={`/tenants/${ tenantId }`} > 
                {
                    ( { tenant }, loading, error ) => {

                        if ( error !== '' ) {
                            return <p> {error} </p>
                        }

                        if ( loading ) {
                            return  <Spinner />
                        }

                        if ( infoShown ) {
                            return <TenantInfo {...tenant} />
                        }


                        let { monthly_payment, payment_history } = tenant;
                    
                        payment_history =  payment_history.filter( ({ year: _year }) => _year === year )
                        return (
                            <>
                                <p id='delete-tenant' onClick={handleDelete}>Delete Tenant</p>
                                <EarningsCard  { ...takeTotalEarnings( payment_history, monthly_payment ) } />
                                <p onClick={ () => setInfoShown(true) }
                                   id='header' 
                                   style={{ textAlign: 'center', marginBottom: '30px' }}>
                                    View all info for { tenant.name }
                                </p>
                                <ToggleYear year={year} callback={_setYear} />
                                { 
                                    sortBy(payment_history, 'month').map( 
                                      
                                        ( month, k ) => ( 
                                            <MonthCard key={k} 
                                                       monthly_payment={ monthly_payment }
                                                       forceUpdate={forceUpdate} 
                                                       { ...month } />
                                        )
                                    )
                                }
                            </>
                        );
                    }
                }
                
            </Fetch>
        </div>
    );
}

export default TenantScreen;