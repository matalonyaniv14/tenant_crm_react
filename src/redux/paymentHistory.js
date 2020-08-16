import store from './store';

const PaymentHistoryState = {
    id: 0,
    title: '',
    value: 0
}

// actions
const UPDATE_HISTORY = 'paymentHistory/updateSuccess';

const updateHistorySuccess = ( paymentHistory ) => ({ type: UPDATE_HISTORY, payload: paymentHistory })

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
    const data = await result.json();
    store.dispatch( updateHistorySuccess( data )  );

}

const paymentHistoryReducer = ( state=PaymentHistoryState, action ) => {
    switch ( action ) {
        case UPDATE_HISTORY: 
            debugger
            console.log('update history', action, state );
        default: 
            return state
    }
} 

export default paymentHistoryReducer;