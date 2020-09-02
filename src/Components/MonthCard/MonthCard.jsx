import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';


import tenantStyle from '../TenantCard/style.module.css';
import style from './style.module.css';
import PaymentBox from '../PaymentBox/PaymentBox';
import {takeBalanceOwed, formatDate, MONTHS, formatIfNull, toCurrency} from '../../Utils/utils';
import Spinner  from '../Spinner/Spinner';
import { BASE_PATH } from '../../Utils/Fetch';


const MonthCard = ( props ) => {
    const [ editableBox, setEditableBox ] = useState({focused: false,loading: false, ...props })
    const [ isChanged, setIsChanged ] = useState(false);
    const [showPartialPayments, setShowPartialPayments] = useState(false);

    const { id,
        month, 
        updated_at,
        total_payed,
        method_payed,
        monthly_payment,
        partial_payments,
        forceUpdate } = props;

    const isCurrentMonth = new Date().getMonth() === month;

    const reset = ( condition) => {
        if ( condition ) {
            setEditableBox({focused: false});
            return true;
        }
    }
    
    const handleClick = ( title, value) => {
        setEditableBox({
             ...editableBox, 
             title, 
             value, 
             focused: !editableBox.focused 
        });
    }

    const onInput = ( val ) => {
        setIsChanged(true);
        setEditableBox( {...editableBox, value: val.target.value} )
    }

    const onBlur = ( e ) => {
        if ( reset(!isChanged) ) return;
        // if ( !isChanged ) {
        //     setEditableBox({focused: false});
        //     return;
        // }

        if ( editableBox.title == 'Total Payed') {
            let _confirm = window.confirm(`You are about to add a payment of  ( ${toCurrency(editableBox.value)} ) ` + "\n" +
                                          `with a payment method of  ( ${formatIfNull(method_payed)} )  ` + "\n" +
                                          `Are your sure?`);
            if ( reset(!_confirm) ) return;
        }

        setEditableBox( { ...editableBox, loading: true } )
        let body = JSON.stringify( { 
            title: editableBox.title, 
            value: editableBox.value 
        })
        
        fetch( `${BASE_PATH}/payment_history/${ id }`, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8' 
            },
            method: 'put',
            body: body
        }).then( response => response.json() )
          .then(( d )=> {
              console.log(d);
              setEditableBox({...d.data, loading: false})
              // re update props
              forceUpdate();
              setIsChanged(false);
            })
    }


    // show spinner if loading paymentBox update
    if ( editableBox.loading ) {
        return ( <Spinner /> )
    }


    return (
        <div className={cx(tenantStyle.cardWrap, { [tenantStyle.currentMonth]: isCurrentMonth })}>
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
                        <PaymentBox onClick={ () => handleClick( 'Total Payed', total_payed ) } 
                                    title='Total Payed' 
                                    value={ total_payed } />

                        <PaymentBox title='Balance Owed' 
                                    value={ takeBalanceOwed( total_payed, monthly_payment ) }/>

                        <PaymentBox onClick={ () => handleClick( 'Method Payed', method_payed ) } 
                                    title='Method Payed' 
                                    value={ method_payed }/>
                    </div>
                    <p onClick={() => setShowPartialPayments(!showPartialPayments)}
                       className={style.showPartial}>
                        Show Partial Payments ({ partial_payments?.length ?? 0 })
                    </p>
                    <div className={cx(style.partialPayments, { [style.active]: showPartialPayments })} >
                        {
                            partial_payments?.map((p) => {
                                return (
                                  <div className={style.partialPaymentRow}>
                                    <p> { toCurrency(p.total_payed)} </p>
                                    <p> { formatIfNull(p.method_payed)}</p>
                                    <p> { formatDate(p.created_at)}</p>
                                  </div>
                                );
                            })
                        }
                    </div>
                </>
                }
            </div>
        </div>
    );
}

export default MonthCard;
// 