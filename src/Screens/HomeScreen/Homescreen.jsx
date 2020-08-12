import React from 'react';

import TenantCard from '../../Components/TenantCard/TenantCard';
import EarningsCard from '../../Components/EarningsCard/EarningsCard';

const HomeScreen = () => {
    return (
        <div>
            <EarningsCard />
            <TenantCard />
        </div>
    );
}

export default HomeScreen;