import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    product: [],
};

const productReducer = createReducer(initialState, {
    product_request: (state, action) => {
        return {
            loading: true,
            products: []
        };
    },
    product_success: (state, action) => {
        return {
            loading: false,
            products: action.payload.data,
            productCount: action.payload.productCount,
            resultperpage: action.payload.resultperpage,
            filteredproductcount: action.payload.filteredproductcount
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
const productsReducer = createReducer(initialState, {
    products_request: (state, action) => {
        return {
            loading: true,
            products: []
        };
    },
    products_success: (state, action) => {
        return {
            loading: false,
            products: action.payload.data,
            productCount: action.payload.productCount,
            resultperpage: action.payload.resultperpage,
            filteredproductcount: action.payload.filteredproductcount
        };
    },
    products_fail: (state, action) => {
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
        console.log('act', action)
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
const categoryReducer = createReducer(initialState, {
    ALL_CATEGORY_REQUEST: (state, action) => {
        return {
            loading: true,
            products: []
        };
    },
    ALL_CATEGORY_SUCCESS: (state, action) => {
        return {
            loading: false,
            category: action.payload.data,

        };
    },
    ALL_CATEGORY_FAIL: (state, action) => {
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
const newProductReducer = createReducer(initialState, {

    NEW_PRODUCT_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true,
        };
    },
    NEW_PRODUCT_SUCCESS: (state, action) => {
        console.log('action', action)
        return {
            loading: false,
            success: action.success,
            product: action.payload,
            messsage: action.messsage
        };
    },
    NEW_PRODUCT_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    },
    NEW_PRODUCT_RESET: (state, action) => {
        return {
            ...state,
            success: false,
        };
    },
    CLEAR_ERRORS: (state, action) => {
        return {
            ...state,
            error: null,
        };
    }

});
const UpdateProductReducer = createReducer(initialState, {

    UPDATE_PRODUCT_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true,
        };
    },
    DELETE_PRODUCT_REQUEST: (state, action) => {
        return {
            ...state,
            loading: true,
        };
    },
    UPDATE_PRODUCT_SUCCESS: (state, action) => {
        console.log('action', action)
        return {
            loading: false,
            success: action.success,
            product: action.payload,
            isUpdated: action.payload
        };
    },
    DELETE_PRODUCT_SUCCESS: (state, action) => {
        console.log('action', action)
        return {
            loading: false,
            isDeleted:action.payload
        };
    },
    UPDATE_PRODUCT_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    },
    DELETE_PRODUCT_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload,
          };
    },
    UPDATE_PRODUCT_RESET: (state, action) => {
        return {
            ...state,
            isUpdated: false
        };
    },
    DELETE_PRODUCT_RESET: (state, action) => {
        return {
            ...state,
            isDeleted: false
        };
    },
    CLEAR_ERRORS: (state, action) => {
        return {
            ...state,
            error: null,
        };
    }

});
export { productReducer, productsReducer, productDetailReducer, categoryReducer, UpdateProductReducer, newProductReducer };