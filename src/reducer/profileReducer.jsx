import { createReducer } from '@reduxjs/toolkit';
const initialState = {
    isUpdated: [],
};

const ProfileReducer = createReducer(initialState, {
    updated_profile_request: (state, action) => {
        // console.log('error:', action);
        return {
            loading: true,
            ...state
        };
    },
    DELETE_USER_REQUEST: (state, action) => {
        // console.log('error:', action);
        return {
            loading: true,
            ...state
        };
    },
    updated_password_request: (state, action) => {
        // console.log('error:', action);
        return {
            loading: true,
            ...state
        };
    },
    updated_profile_success: (state, action) => {
        console.log('action:', action)
        return {
            ...state,
            loading: false,
            isUpdated: action.payload
        };
    },
    updated_password_success: (state, action) => {
        console.log('action:', action)
        return {
            ...state,
            loading: false,
            isUpdated: action.payload
        };
    },
    DELETE_USER_SUCCESS: (state, action) => {
        console.log('action:', action)
        return {
            ...state,
            loading: false,
            isDeleted: action.payload,
            // message: action.payload.message,
        };
    },
    updated_profile_fail: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    },
    DELETE_USER_FAIL: (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    },
    updated_password_fail: (state, action) => {
        console.log(action)
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    },
    updated_profile_reset: (state, action) => {
        return {
            ...state,
            isUpdated: false
        }
    },
    delete_user_reset: (state, action) => {
        return {
            ...state,
            isDeleted: false,
        }
    },
    updated_password_reset: (state, action) => {
        return {
            ...state,
            isUpdated: false
        }
    },
    error_clear: (state, action) => {
        return {
            ...state,
            error: null,
        };
    },
});


const ForgetPasswordReducer = createReducer(initialState, {
    forget_password_request: (state, action) => {
        return {
            loading: true,
            ...state,
            error: null
        };
    },
    reset_password_request: (state, action) => {
        return {
            loading: true,
            ...state,
            error: null
        };
    },
    forget_password_success: (state, action) => {

        return {
            ...state,
            loading: false,
            message: action.payload
        };
    },
    reset_password_success: (state, action) => {
        console.log('action:', action)
        return {
            ...state,
            loading: false,
            success: action.payload
        };
    },
    forget_password_fail: (state, action) => {
        console.log(action)
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    },
    reset_password_fail: (state, action) => {
        console.log(action)
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    },
    error_clear: (state, action) => {
        return {
            ...state,
            error: null,
        };
    },
});

export { ProfileReducer, ForgetPasswordReducer }