import React, { useRef, useEffect, useState } from 'react';

import { InfoBar } from '../TenantInfo/TenantInfo';
import style from './style.module.css';
import { useFetchPost } from '../../Utils/hooks';
import Spinner from '../Spinner/Spinner';
import TenantScreen from '../../Screens/TenantScreen/TenantScreen';

import {BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import cx from 'classnames';


const Form = ( {handleSubmit, submitRef} ) => {
    return (
        <form onSubmit={handleSubmit} className={style.form} >
            <div className={style.inputWrap}>
                <InfoBar label='name' title='NAME'  />
                <InfoBar label='social' title='SOCIAL'    />
                <InfoBar label='d_o_b' title='DATE OF BIRTH'  type='date'   />
                <InfoBar label='telephone' title='TELEPHONE'    />
                <InfoBar label='email' title='EMAIL'    />
                <InfoBar label='monthly_payment' title='MONTHLY PAYMENT'  type='number'   />
                <InfoBar label='move_in' title='MOVE IN' type='date'  />
                <InfoBar label='renewal' title='RENEWAL' type='date'   />
                <InfoBar label='address' title='ADDRESS'   />
            </div>
            <div className={style.submitWrap}>
                <label htmlFor="tenantNew"  className={style.submit}> 
                    <p>Create Tenant</p>
                </label>
                <input  id='tenantNew' type="submit"  hidden/>
            </div>
        </form>
    );
}




const TenantForm = () => {
    const [_, setState] = useState(null);
    const formRef = useRef(null);
    const history = useHistory();
    const { error, loading, data, post } = useFetchPost();

    const toggleSubmit = () => {
        const { current } = formRef;
        // const { current: submit } = submitRef;

        if (current) {
            const isSubmitted = current.classList.toggle(style.submitted);
            // submit.value = isSubmitted ? ' ' : 'Create Tenant';
        }
    }


    const handleSubmit = ( e ) => {
        e.preventDefault();
        toggleSubmit();

        const { target: { elements } } = e;
        const tenant = [...elements].reduce( ( acc, current ) => {
            const { dataset: { label }, value } = current;
            acc[label] = value
            return acc;
        }, {})

        post('/tenants', {tenant})
    }

    useEffect(() => {
        if (error) {
            setTimeout(toggleSubmit, 500);        
        }

        if (data) {
            history.push(`/tenant/${ data.tenant.id }`)
        }
        },[error, data]);

    return (
        <div>
        { loading && <Spinner /> }
        <Router>
            <Switch>
                <Route path='/tenant/new'>
                    <div ref={formRef}>
                        <div className={cx(style.errors, {[style.active]: error})}>
                            { error && error.map((e,i) => (
                                <p key={i}>{e}</p> 
                            )) }
                        </div>
                        <Form handleSubmit={handleSubmit} />
                    </div>
                </Route>
                <Route path='/tenant/:id'>
                    <TenantScreen />
                </Route>
            </Switch>
        </Router>
        </div>
    );
}


export default TenantForm;