import React, { useEffect, useState } from 'react';

export const BASE_PATH = 'https://d7bd256c30f9.ngrok.io';


const Fetch = ( props ) => {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');
 
    useEffect( () => {
        try {
            fetch( BASE_PATH + props.path )
                .then( resp => resp.json() )
                .then( ( data ) => {
                    if ( data.status !== 200 ) {
                        setError( data.error );
                    }
                    setData( data );
                    setLoading( false );
                })
        } catch(e) {
            setError(e);
        }
    }, [ props.children]);



    return (
         props.children( data, loading, error )
    );
}


export default Fetch;
