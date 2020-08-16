import { stat } from "fs";

export const PaymentHistoryState = [{
    id: 0,
    method_payed: '',
    month: 0,
    payed_in_full: false,
    tenant_id: 0,
    total_payed: 0,
    updated_at: '',
    year: 0,
    focused: false
}]

// actions
export const UPDATE_HISTORY = 'paymentHistory/updateSuccess';
export const BOX_EDITABLE = 'paymentHistory/boxEditable';
export const LOAD_HISTORY = 'paymentHistory/loadData';


export const makeBoxEditable = ( paymentBox ) => (  { type: BOX_EDITABLE, payload: paymentBox } )
export const loadHistory = ( data ) => ({ type: LOAD_HISTORY , payload: data})
export const updateHistorySuccess = ( paymentHistory ) => ({ type: UPDATE_HISTORY, payload: paymentHistory })

export const paymentHistoryReducer = ( state=PaymentHistoryState, action ) => {
    switch ( action.type ) {
        case UPDATE_HISTORY: 
            // return {...state, action.payload};
            console.log(UPDATE_HISTORY);
            break;
        case BOX_EDITABLE:
            console.log(BOX_EDITABLE);
            console.log( state, action )
            return { ...state, ...action.payload, focused: true }
        case LOAD_HISTORY: 
            return { ...state, ...action.payload }
        default: 
        console.log('default', this)
            return state
    }
} 