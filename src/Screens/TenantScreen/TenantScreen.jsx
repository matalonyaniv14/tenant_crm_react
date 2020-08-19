import React from 'react';
import Spinner from '../../Components/Spinner/Spinner';
import {
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import Fetch from '../../Utils/Fetch';
import { takeBalanceOwed, sortBy } from '../../Utils/utils';
import EarningsCard from '../../Components/EarningsCard/EarningsCard';
import MonthCard from '../../Components/MonthCard/MonthCard';
import { useState } from 'react';



const takeTotalEarnings = ( paymentHistory, monthlyPayment ) => {
   let totalDue, totalPayed, balanceOwed;

    totalDue = paymentHistory.length * monthlyPayment;
    totalPayed = paymentHistory
                    .map( month => month.total_payed )
                    .reduce( ( total, curr ) => total += curr );

    balanceOwed =  takeBalanceOwed(totalPayed, totalDue);

    return { totalDue, totalPayed, balanceOwed };
}





const TenantScreen = () => {
    const{ tenantId } = useParams()
    const [ _, setState ] = useState();

    const forceUpdate = () => {
        setState({});
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

                        const { monthly_payment, payment_history } = tenant;

                        return (
                            <>
                                <EarningsCard  { ...takeTotalEarnings( payment_history, monthly_payment ) } />
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