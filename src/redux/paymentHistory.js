import store from './store';
import { updateHistorySuccess } from './reducers';


// action creators
export const updatePaymentHistory = async ( paymentObject ) => {
    const { id, title, value } = paymentObject;

    const result = await  fetch( `http://localhost:3000/payment_history/${ id }`, {
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8' 
                                },
                                method: 'put',
                                body: JSON.stringify( { title, value } )
                            })
    const resp = await result.json();
    store.dispatch( updateHistorySuccess( resp.data )  );

}


