import { combineReducers, createStore } from 'redux';

import PaymentHistoryReducer from './paymentHistory';

const rootReducer = combineReducers({
    paymentHistory: PaymentHistoryReducer
})

const store = createStore( rootReducer );

export default store;