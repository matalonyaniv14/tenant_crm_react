import React from 'react';

import TenantCard from '../../Components/TenantCard/TenantCard';
import EarningsCard from '../../Components/EarningsCard/EarningsCard';
import Fetch from '../../Utils/Fetch';


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



const HomeScreen = () => {
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
                                    <EarningsCard />
                                    {'Loading...'} 
                                </>
                            );
                        }

                        return (
                            <>
                                <EarningsCard { ...takeTotalEarnings( data.tenants ) } />
                                {
                                    data.tenants.map( 
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