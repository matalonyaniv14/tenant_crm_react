import React, { useState, useRef } from 'react';

import style from './style.module.css';
import { addZero, formatIfNull, isNumber } from '../../Utils/utils';
import { BASE_PATH } from '../../Utils/Fetch';



const toDateInput = ( d ) => {
    const [month, day, year] = new  Date(d).toLocaleDateString().split('/'); 
    
    return `${year}-${addZero(month)}-${addZero(day)}`;
}



export const InfoBar = ( { id, label, title, value, type='text', callback } ) => {
    const [ inputVal, setInputVal ] = useState('');
    const wrapEl = useRef(null);


    const handleClick = () => {
        const currentWrap   = wrapEl.current;
        currentWrap.classList.add( style.activeWrap );
    }

    const handleInput = ( c ) => {
        const { target } = c;
        setInputVal( target.value );
    }
    
    const handleBlur = ( elem ) => {
        const currentWrap   = wrapEl.current;
        currentWrap.classList.remove( style.activeWrap );

        if ( callback ) callback( elem );
    }

    return (
        <div  onClick={handleClick} ref={wrapEl} className={ style.wrap }>
            <p className={ style.title }> { title } </p>
            <div  className={style.bar}>
                <input 
                       onChange={handleInput}
                       onBlur={handleBlur}  
                       type={ type } 
                       data-label={ label }
                       placeholder={value}
                       value={ type === 'text' ? formatIfNull(inputVal) : inputVal }/>
            </div>
        </div>
    );
}



const TenantInfo = ( props ) => {
    const [_, setState] = useState(null);


    const {
        id,
        social,
        d_o_b: birthday,
        telephone,
        email,
        monthly_payment: monthlyPayment,
        move_in: moveIn,
        renewal,
        address,
        name
    } = props;



    const onBlur = ( elem ) => {
        const {target: {dataset: {label}}, target: {value}} = elem;
        const tenant = {
            [label]: value
        };
    
        fetch(`${BASE_PATH}/tenants/${id}`, {
            method: 'put',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' 
            },
            body: JSON.stringify( { tenant } )
        })
    }


    return (
        <div>
           <InfoBar label='name' title='NAME' value={name} callback={onBlur}/>
           <InfoBar label='social' title='SOCIAL' value={social}  callback={onBlur} />
           <InfoBar label='d_o_b' title='DATE OF BIRTH' value={birthday} type='date'  callback={onBlur} />
           <InfoBar label='telephone' title='TELEPHONE' value={telephone}  callback={onBlur} />
           <InfoBar label='email' title='EMAIL' value={email}  callback={onBlur} />
           <InfoBar label='monthly_payment' title='MONTHLY PAYMENT' value={monthlyPayment} type='number'  callback={onBlur} />
           <InfoBar label='move_in' title='MOVE IN' value={toDateInput(moveIn)}  type='date' callback={onBlur} />
           <InfoBar label='renewal' title='RENEWAL' value={toDateInput(renewal)} type='date'  callback={onBlur} />
           <InfoBar label='address' title='ADDRESS' value={address} callback={onBlur} />
        </div>
    );
}

export default TenantInfo;