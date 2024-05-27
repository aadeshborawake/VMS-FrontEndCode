import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import orderReducer from './orderredux/reducers';
import productReducer from '../src/productredux/productSlice';

const rootReducer = combineReducers({
  orders: orderReducer,
  product: productReducer,
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
