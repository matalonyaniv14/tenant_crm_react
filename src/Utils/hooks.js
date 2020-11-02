import { useState } from 'react';
import { BASE_PATH } from './Fetch';



export const useFetchPost = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    

    const post = (path,body) => {
        setLoading(true);
        const OPTIONS = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' 
            },
            body: JSON.stringify(body)
        }
        try {
            const auth = localStorage.getItem('authorized');
            fetch(`${BASE_PATH}/${path}?pass=${auth}`, OPTIONS)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.error) {
                        const errors =  Object.keys(data.error)
                            .map(key => `${key} ${data.error[key].map(e => `${e}`)}`)
                        
                        console.log(data, errors);
                        setError( errors );
                        setLoading(false);
                    }

                    if ( data.status === 200) {
                        setData(data);
                        setLoading(false);
                    }
                }).catch(e => {
                    console.log(e);
                    setError([JSON.stringify(e)]);
                    setLoading(false);
                })
        } catch(e) {
            setError([e]);
        }
    }



    return { error, loading, data, post }
}

