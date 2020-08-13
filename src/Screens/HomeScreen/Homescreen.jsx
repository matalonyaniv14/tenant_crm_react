import React from 'react';

import TenantCard from '../../Components/TenantCard/TenantCard';
import EarningsCard from '../../Components/EarningsCard/EarningsCard';
import Fetch from '../../Utils/Fetch';


const HomeScreen = () => {
    return (
        <>
            <EarningsCard />
            <Fetch path='/tenants/'>
                {
                    ( data, loading, error) => {
                        // handle error
                        if ( error !== '' )  console.log( "error in homescreen", error )

                       return  loading ? 'Loading...' :
                         data.tenants.map( ( tenant, k ) => {
                            return <TenantCard key={k} { ...tenant } />
                        } )
                    }
                }
            </Fetch>
        </>
    );
}

export default HomeScreen;