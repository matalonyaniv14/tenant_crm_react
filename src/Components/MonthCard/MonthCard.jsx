import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';


import tenantStyle from '../TenantCard/style.module.css';
import PaymentBox from '../PaymentBox/PaymentBox';
import {takeBalanceOwed, formatDate, MONTHS} from '../../Utils/utils';



const MonthCard = ( props ) => {
    const [ editableBox, setEditableBox ] = useState({focused: false, ...props })
    const { id,
            month, 
            updated_at,
            total_payed,
            method_payed,
            monthly_payment,
            forceUpdate } = props;
        

    const handleClick = ( title, value) => {
        setEditableBox({
             ...editableBox, 
             title, 
             value, 
             focused: !editableBox.focused 
        });
    }

    const onInput = ( val ) => {
        setEditableBox( {...editableBox, value: val.target.value} )
    }

    const onBlur = ( e ) => {
        let body = JSON.stringify( { 
            title: editableBox.title, 
            value: editableBox.value 
        })
        
        fetch( `http://localhost:3000/payment_history/${ id }`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8' 
            },
            method: 'put',
            body: body
        }).then( response => response.json() )
          .then( d => setEditableBox(d.data) )

        // re update props
        forceUpdate();
    }



    return (
        <div className={tenantStyle.cardWrap}>
            <div className={tenantStyle.cardContent}>
               { editableBox.focused ? 
                    <PaymentBox onInput={onInput} onBlur={onBlur} title={editableBox.title} value={editableBox.value} editable />
                    :
                <>
                    <div className={tenantStyle.cardHeader}>
                        <p id='header'> { MONTHS[month - 1] } </p>
                        <p id='subHeader'> last edited on { formatDate( updated_at ) } </p>
                    </div> 
                    <div className={tenantStyle.cardPaymentInfo}>
                        <PaymentBox onClick={ () => handleClick( 'Total Payed', total_payed ) } 
                                    title='Total Payed' 
                                    value={ total_payed } />

                        <PaymentBox title='Balance Owed' 
                                    value={ takeBalanceOwed( total_payed, monthly_payment ) }/>

                        <PaymentBox onClick={ () => handleClick( 'Method Payed', method_payed ) } 
                                    title='Method Payed' 
                                    value={ method_payed }/>
                    </div>
                </>
                }
            </div>
        </div>
    );
}

export default MonthCard;
