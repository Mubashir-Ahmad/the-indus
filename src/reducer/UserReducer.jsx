import { createReducer } from '@reduxjs/toolkit';
const initialState = {
    user: [],
    isAuthenticated:false
};

const userReducer = createReducer(initialState, {
    login_request:(state, action) => {
        // console.log('error:', action);
        return {        
            loading: true,
            isAuthenticated:false,
            // user:[]
        };
    },
    register_request:(state, action) => {
        // console.log('error:', action);
        return {        
            loading: true,
            isAuthenticated:false,
            iscreated:false,
            // user:[]
        };
    },
    load_user_request:(state, action) => {
        // console.log('error:', action);
        return {        
            loading: true,
            isAuthenticated:false,
            // user:[]
        };
    },
    login_success: (state, action) => {
        return {
            loading: false,        
            isAuthenticated:true,
            user:action.payload

        };
    },
    register_success: (state, action) => {
        return {
            loading: false,        
            isAuthenticated:false,
            user:action.payload,
            iscreated:true,
        };
    },
    load_user_success: (state, action) => {
        return {
            loading: false,        
            isAuthenticated:true,
            user:action.payload
        };
    },
    logout_success:(state,action)=>{
        return{
            loading:false,
            user:null,
            isAuthenticated:false,
            iscreated:false,
        }
    },
   login_fail: (state, action) => {
  
        return {
            error: action.payload,
            ...state,
            loading: false,
            isAuthenticated:false,
            user:null
        };
    },
    register_fail: (state, action) => {
            return {
                error: action.payload,
                ...state,
                loading: false,
                isAuthenticated:false,
                user:null
            };
        },
        admin_register_reset:(state,action)=>{
            return{
                ...state,
               iscreated:false
            }
           },
        load_user_fail: (state, action) => {
            console.log('error:', action);
                return {
                    error: action.payload,
                    loading: false,
                    isAuthenticated:false,
                    user:null
                };
            },
            logout_fail:(state,action)=>{
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
            },
    error_clear: (state, action) => {
        return {
            ...state,
            error: null,
        };
    },
});
const allUsersReducer =createReducer(initialState, {
    
       ALL_USERS_REQUEST:(state , action)=>{
        return {
          ...state,
          loading: true,
        };
    },
     ALL_USERS_SUCCESS:(state , action) =>{
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
    },
       ALL_USERS_FAIL:(state , action)=>{
        return {
          ...state,
          loading: false,
          error: action.payload,
        };},
       CLEAR_ERRORS:(state , action)=>{
        return {
          ...state,
          error: null,
        };
    },
});
  
export {userReducer ,allUsersReducer}