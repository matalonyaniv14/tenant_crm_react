import React, { useEffect, useState } from 'react';

export const BASE_PATH = 'https://tenant-crm-api.herokuapp.com';


const Fetch = ( props ) => {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');
 
    useEffect( () => {
        window.alert( ' STARTING FETCH ' );
        try {
            fetch( BASE_PATH + props.path )
                .then( resp => resp.json() )
                .then( ( data ) => {
                    window.alert( ' FETCH FINISHED' );
                    if ( data.status !== 200 ) {
                        window.alert('ERROR ', data);
                        setError( data.error );
                    }
                    window.alert( 'NO ERROR ', data );
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