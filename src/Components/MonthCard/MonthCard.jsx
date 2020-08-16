import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';


import tenantStyle from '../TenantCard/style.module.css';
import PaymentBox from '../PaymentBox/PaymentBox';
import {formatKey, toCurrency, formatIfNul, takeBalanceOwed} from '../../Utils/utils';
import { updatePaymentHistory } from '../../redux/paymentHistory';



const MONTHS = [ "January", "February", "March", "April", "May", 
                 "June", "July", "August", "September", "October", 
                  "November", "December" 
               ];

const formatDate = ( d ) => {
    let [month, day, year]  = ( new Date( d ) ).toLocaleDateString().split("/");

    return `${ MONTHS[month] } ${ day }, ${ year }`
}



const MonthCard = ( props ) => {
    const [ editableBox, setEditableBox ] = useState({
        id: 0,
        title: '',
        value: 0,
        focused: false
    })

    const { id,
            month, 
            updated_at,
            total_payed,
            method_payed,
            monthlyPayment } = props;


    const handleClick = ( title, value) => {
        setEditableBox({ title, value, focused: !editableBox.focused });
    }

    const onInput = ( val ) => {
        console.log(val.target.value)
        setEditableBox( {...editableBox, value: val.target.value} )
    }

    const onBlur = ( e ) => {
        console.log(editableBox);
        console.log(props.id);
        const payload = { 
            title: editableBox.title, 
            value: editableBox.value, 
            id: props.id 
        }

        updatePaymentHistory( payload );
        // fetch( `http://localhost:3000/payment_history/${ id }`, {
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8' 
        //     },
        //     method: 'put',
        //     body: JSON.stringify( { title: editableBox.title, value: editableBox.value } )
        // })
        //     .then( response => response.json() )
        //     .then( data => console.log( data ) )

        handleClick();
    }



    return (
        <div className={tenantStyle.cardWrap}>
            <div className={tenantStyle.cardContent}>
               { editableBox.focused ? 
                    <PaymentBox onInput={onInput} onBlur={onBlur} title={editableBox.title} value={editableBox.value} editable />
                    :
                <>
                    <div className={tenantStyle.cardHeader}>
                        <p id='header'> { MONTHS[month] } </p>
                        <p id='subHeader'> last edited on { formatDate( updated_at ) } </p>
                    </div> 
                    <div className={tenantStyle.cardPaymentInfo}>
                        <PaymentBox onClick={ () => handleClick( 'Total Payed', total_payed ) } title='Total Payed' value={ total_payed } />
                        <PaymentBox title='Balance Owed' value={ takeBalanceOwed( total_payed, monthlyPayment ) }/>
                        <PaymentBox title='Method Payed' value={ method_payed }/>
                    </div>
                </>
                }
            </div>
        </div>
    );
}

export default MonthCard;
