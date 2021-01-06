import React, { useEffect, useState } from 'react';


export const BASE_PATH = 'https://www.tenant-api.xyz';
// export const BASE_PATH = 'http://localhost:3002';


const Fetch = ( props ) => {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');

 
    useEffect( () => {
        try {
            const auth = localStorage.getItem('authorized');
            fetch( BASE_PATH + props.path  + '?pass=' + auth)
                .then( (resp) =>{ 
                    if ( resp.ok ) {
                        return  resp.json();
                    }

                    setError(resp.statusText)
                }).then( ( data ) => {
                    if ( data.status !== 200 ) setError( data.error );

                    setData( data );
                    setLoading( false );
                }).catch((e) => {
                    window.alert(e);
                    setError("There was an error");
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

