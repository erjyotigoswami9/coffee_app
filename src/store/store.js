import { legacy_createStore , applyMiddleware , combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import {logger} from 'redux-logger'
import { cartReducer, data_coffee_fetch_Reducer, totalPriceReducer } from './reducers';

const rootReducer = combineReducers({
    coffee : data_coffee_fetch_Reducer ,
    cart : cartReducer,
    total : totalPriceReducer
})
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk)) ;