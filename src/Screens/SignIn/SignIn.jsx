import React, { useState } from 'react';
import { BASE_PATH } from '../../Utils/Fetch';
import style from './style.module.css';

const formatCookies = ( cookieString ) => {
    return cookieString.split( ';' )
        .reduce( (acc, c) => {
            const [k,v] = c.split( '=' );
            acc[k] = v;

            return acc;
        },{})
}




const authorized = () => {
    const auth = localStorage.getItem('authorized');

    if ( auth === 'true' ) {
        return true;
    }

    return false;
}





const SignIn = ( props ) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [_, setState] = useState(null);

    
    const handleInput = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(BASE_PATH + '/sign_in' + '?password=' + password)
            .then(res => res.json())
            .then( data => {
                console.log(data);
                if ( data.error ) {
                    console.log('error');
                }
                
                if ( data.error ) {
                    setError(data.error);
                }

                if ( data.authorized ) {
                    // ;expires=${data.expiration.toUTCString()}
                   localStorage.setItem('authorized', true);
                   setState({});
                }


            })
    }




    if ( authorized() ) {
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