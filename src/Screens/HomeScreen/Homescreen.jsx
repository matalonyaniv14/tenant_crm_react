import React from 'react';

import TenantCard from '../../Components/TenantCard/TenantCard';
import EarningsCard from '../../Components/EarningsCard/EarningsCard';
import Fetch from '../../Utils/Fetch';
import Spinner from '../../Components/Spinner/Spinner';
import { useLocation } from 'react-router-dom';

const takeTotalEarnings = ( tenants ) => {
    const totalEarnings = {
        totalDue: 0,
        totalPayed: 0,
        balanceOwed: 0
    };

    for ( let t of tenants ) {
        totalEarnings.totalDue += t.snapshot.total_due;
        totalEarnings.totalPayed += t.snapshot.total_payed;
        totalEarnings.balanceOwed += t.snapshot.balance_owed;
    }

    return totalEarnings;
}



const latePayments = ( tenants ) => {
    return tenants.filter( ( t ) => {
        return t.snapshot.balance_owed < 0;
    } )
}



const HomeScreen = ( props ) => {
    const { filter } = useLocation();
    
    return (
        <>
            <Fetch path='/tenants/'>
                {
                    ( data, loading, error) => {
                        // handle error
                        if ( error !== '' )  console.log( "error in homescreen", error )
                        
                        if ( loading ) {
                            return (   
                                <> 
                                    <Spinner />
                                </>
                            );
                        }

                        const tenants = filter === 'late_payments' ? latePayments( data.tenants ) : data.tenants;
                        return (
                            <>
                                <EarningsCard { ...takeTotalEarnings( tenants ) } />
                                {
                                    tenants.map( 
                                        ( tenant, k ) => <TenantCard key={k} { ...tenant } />
                                    )
                                }
                            </>
                        );
                    }
                }
            </Fetch>
        </>
    );
}

export default HomeScreen;