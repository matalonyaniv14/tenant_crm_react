import React, { useEffect, useState } from 'react';

const BASE_PATH = 'http://localhost:3000';


const Fetch = ( props ) => {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');
 
    useEffect( () => {
        try {
            fetch( BASE_PATH + props.path )
                .then( resp => resp.json() )
                .then( ( data ) => {
                    setData( data );
                    setLoading( false );
                })
        } catch(e) {
            setError(e);
        }
    }, [ props.path ]);



    return (
         props.children( data, loading, error )
    );
}


export default Fetch;
