import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    product:[],
};

const productReducer = createReducer(initialState, {
    product_request: (state, action) => {
        return {        
            loading: true,
            products:[]
        };
    },
    product_success: (state, action) => {
        return {
            loading: false,        
            products: action.payload.data,
            productCount: action.payload.productCount,
            resultperpage:action.payload.resultperpage,
            filteredproductcount:action.payload.filteredproductcount
        };
    },
    product_fail: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    },
    error_clear: (state, action) => {
        return {
            ...state,
            error: null,
        };
    },
});
const AdminproductReducer = createReducer(initialState, {
    ADMIN_PRODUCT_REQUEST: (state, action) => {
        return {        
            loading: true,
            products:[]
        };
    },
    ADMIN_PRODUCT_SUCCESS: (state, action) => {
        return {
            loading: false,        
            products: action.payload,
        };
    },
    ADMIN_PRODUCT_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    },
    error_clear: (state, action) => {
        return {
            ...state,
            error: null,
        };
    },
});
const productDetailReducer = createReducer(initialState, {
    product_detail_request: (state, action) => {
        return {        
            loading: true,
            ...state
        };
    },
    product_detail_success: (state, action) => {
        console.log('act',action)
        return {
            loading: false,
            product: action.payload,            
        };
    },
    product_detail_fail: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    },
    error_clear: (state, action) => {
        return {
            ...state,
            error: null,
        };
    },
});
export {productReducer, productDetailReducer,AdminproductReducer};