import React from 'react';

import { InfoBar } from '../TenantInfo/TenantInfo';
import { BASE_PATH } from '../../Utils/Fetch';
import style from './style.module.css';

const TenantForm = () => {
    const handleSubmit = ( e ) => {
        e.preventDefault()
        const { target: { elements } } = e;

        const tenant = [...elements].reduce( ( acc, current ) => {
            const { dataset: { label }, value } = current;
            acc[label] = value
            return acc;
        }, {})

        fetch( `${BASE_PATH}/tenants`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' 
            },
            body: JSON.stringify({ tenant })
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <InfoBar label='name' title='NAME'  />
                <InfoBar label='social' title='SOCIAL'    />
                <InfoBar label='d_o_b' title='DATE OF BIRTH'  type='date'   />
                <InfoBar label='telephone' title='TELEPHONE'    />
                <InfoBar label='email' title='EMAIL'    />
                <InfoBar label='monthly_payment' title='MONTHLY PAYMENT'  type='number'   />
                <InfoBar label='move_in' title='MOVE IN' type='date'  />
                <InfoBar label='renewal' title='RENEWAL' type='date'   />
                <InfoBar label='address' title='ADDRESS'   />

                <input className={style.submit} type="submit" value='Create Tenant'/>
            </form>
        </div>
    );
}


export default TenantForm;