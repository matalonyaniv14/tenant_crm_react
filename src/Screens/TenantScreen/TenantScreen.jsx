import React from 'react';
import {
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import Fetch from '../../Utils/Fetch';
import { takeBalanceOwed } from '../../Utils/utils';
import EarningsCard from '../../Components/EarningsCard/EarningsCard';
import MonthCard from '../../Components/MonthCard/MonthCard';



const takeTotalEarnings = ( paymentHistory, monthlyPayment ) => {
   let totalDue, totalPayed, balanceOwed;

    totalDue = paymentHistory.length * monthlyPayment;
    totalPayed = paymentHistory
                    .map( month => month.total_payed )
                    .reduce( ( total, curr ) => total += curr );

    balanceOwed =  takeBalanceOwed(totalPayed, totalDue  );

    return { totalDue, totalPayed, balanceOwed };
}


const TenantScreen = () => {
    const{ tenantId } = useParams()
    
    return (
        <div>
            <Fetch path={`/tenants/${ tenantId }`} > 
                {
                    ( { tenant }, loading, error ) => {
                        if ( error !== '' ) {
                            console.log('Error in TenantScreen', error);
                            return <p>error</p>
                        }

                        if ( loading ) {
                            return <p>loading...</p>
                        }

                        const { monthly_payment, payment_history } = tenant;

                        return (
                            <>
                                <EarningsCard  { ...takeTotalEarnings( payment_history, monthly_payment ) } />
                                { 
                                    payment_history.map( 
                                        ( month, k ) => ( 
                                            <MonthCard key={k} 
                                                       monthlyPayment={ monthly_payment } 
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