import React from 'react';
import cx from 'classnames';

import style from './style.module.css';
import {toCurrency, isNumber, formatIfNull} from '../../Utils/utils';

const PaymentBox = ( { title, value, onClick, editable, onBlur, onInput } ) => {
    return (
        <div className={cx(style.paymentWrap, {[style.activeEditable]: editable  })}>
            <div className={style.paymentHeader}>
                <p>{ title }</p>
            </div>
            <div  onClick={ onClick } className={cx(style.paymentValue,{[style.unpaid]: value < 0})}>
                {
                    editable ? <input  onInput={onInput} onBlur={onBlur} placeholder={value} type='number' autoFocus/> :
                    <p>{ 
                        isNumber( value ) ? toCurrency( value ) : formatIfNull( value ) 
                        }
                    </p>
                }
            </div>
        </div>
    );
}

export default PaymentBox;