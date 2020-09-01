import React, { useState } from 'react';
import { BASE_PATH } from '../../Utils/Fetch';
import style from './style.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const formatCookies = ( cookieString ) => {
    return cookieString.split( ';' )
        .reduce( (acc, c) => {
            const [k,v] = c.split( '=' );
            acc[k] = v;

            return acc;
        },{})
}








const SignIn = ( props ) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [auth, setAuth] = useState(false);
    const [state, setState] = useState(false);
    

    const authorized = async () => {
        const auth = localStorage.getItem('authorized');
        const data = await fetch(BASE_PATH + '/authorization?pass=' + auth)
        const result = await data.json();
        setAuth(result.ok);
    }

    useEffect(() => {
        console.log('useffect', auth);
        authorized()

    }, [state])
    
    
    const handleInput = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(BASE_PATH + '/sign_in' + '?password=' + password)
            .then(res => res.json())
            .then( data => {
                if ( data.error ) {
                    setError(data.error);
                }
                if ( data.authorized ) {
                   localStorage.setItem('authorized', data.storage);
                   setState(true);
                }


            })
    }


    if (auth) {
        return props.children;
    }

    return (
        <div className={style.wrap}>
                    <h1>Please Sign In</h1>
                    <h4 className={style.error}>{error}</h4>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input  onChange={handleInput} value={password}/>
                            <div className={style.submit}>
                                <label htmlFor="signIn"> Sign In</label>
                                <input type="submit" id="signIn" hidden/>
                            </div>
                        </form>
                    </div>
                </div>
    );
}


export default SignIn;