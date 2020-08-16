import { combineReducers, createStore } from 'redux';

import {paymentHistoryReducer} from './reducers';

const rootReducer = combineReducers({
    paymentHistoryReducer: paymentHistoryReducer
})

const store = createStore( rootReducer );
console.log( store.getState());
export default store;