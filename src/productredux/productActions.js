export const PRODUCT_CREATE_REQUEST = 'PRODUCT_CREATE_REQUEST';
export const PRODUCT_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS';
export const PRODUCT_CREATE_FAILURE = 'PRODUCT_CREATE_FAILURE';

export const createProductRequest = () => ({
  type: PRODUCT_CREATE_REQUEST,
});

export const createProductSuccess = (product) => ({
  type: PRODUCT_CREATE_SUCCESS,
  payload: product,
});

export const createProductFailure = (error) => ({
  type: PRODUCT_CREATE_FAILURE,
  payload: error,
});
