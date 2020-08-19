import React, { useEffect, useState } from 'react';

export const BASE_PATH = 'https://tenant-crm-api.herokuapp.com';


const Fetch = ( props ) => {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');
 
    useEffect( () => {
        try {
            fetch( BASE_PATH + props.path ).then( (resp) =>{ 
                    return resp.json();
                }).then( ( data ) => {
                    if ( data.status !== 200 ) {
                        setError( data.error );
                    }
                    setData( data );
                    setLoading( false );
                })
        } catch(e) {
            setError(e);
        }
    }, [props.children]);

// 

    return (
         props.children( data, loading, error )
    );
}


export default Fetch;
// 