// actions.js

import axios from 'axios';
import { isCurrentUserAdmin } from '../helpers/user';

export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';
export const DELETE_ORDER_REQUEST = 'DELETE_ORDER_REQUEST';
export const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS';
export const DELETE_ORDER_FAILURE = 'DELETE_ORDER_FAILURE';

export const fetchOrdersRequest = () => ({
  type: FETCH_ORDERS_REQUEST
});

export const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders
});

export const fetchOrdersFailure = (error) => ({
  type: FETCH_ORDERS_FAILURE,
  payload: error
});

export const deleteOrderRequest = () => ({
  type: DELETE_ORDER_REQUEST
});

export const deleteOrderSuccess = (orderId) => ({
  type: DELETE_ORDER_SUCCESS,
  payload: orderId
});

export const deleteOrderFailure = (error) => ({
  type: DELETE_ORDER_FAILURE,
  payload: error
});

export const fetchOrders = () => {
  return async (dispatch) => {
    dispatch(fetchOrdersRequest());
    try {
      const response = await axios.get('http://localhost:8080/api/orders/list');
      dispatch(fetchOrdersSuccess(response.data));
    } catch (error) {
      dispatch(fetchOrdersFailure('Error fetching orders. Please try again later.'));
    }
  };
};

export const deleteOrder = (orderId, userRole) => {
  const isAdmin = isCurrentUserAdmin();
  return async (dispatch) => {
    dispatch(deleteOrderRequest());
    try {
      await axios.delete(`http://localhost:8080/api/orders/delete/${orderId}`, {
        headers: {
          'user-role': isAdmin ? 'admin' : 'user'
        }
      });
      dispatch(deleteOrderSuccess(orderId));
    } catch (error) {
      dispatch(deleteOrderFailure('Error deleting order. Please try again later.'));
    }
  };
};

