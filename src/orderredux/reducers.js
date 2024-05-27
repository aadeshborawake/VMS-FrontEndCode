
import {
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE
  } from './action';
  
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ORDERS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_ORDERS_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: action.payload,
          error: null
        };
      case FETCH_ORDERS_FAILURE:
        return {
          ...state,
          loading: false,
          orders: [],
          error: action.payload
        };
      case DELETE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case DELETE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: state.orders.filter(order => order.id !== action.payload),
          error: null
        };
      case DELETE_ORDER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;