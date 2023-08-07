import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  updatedate:[]
};

const createcategoryReducer = createReducer(initialState, {
    CREATE_CATEGORY_REQUEST:(state,action)=>{
        return{
            ...state,
            loading: true,
        }
    },
    UPDATE_CATEGORY_REQUEST:(state,action)=>{
        return{
            ...state,
            loading: true,
        }
    },
    GET_CATEGORY_REQUEST:(state,action)=>{
        return{
            ...state,
            loading: true,
        }
    },
    UPDATE_CATEGORY_SUCCESS: (state, action) => {
    console.log('aa',action)
    return{
        data:action.payload,
        isupdated:true
    }
  },
    CREATE_CATEGORY_SUCCESS: (state, action) => {
    console.log('aa',action)
    return{
        data:action.payload,
        isupdated:true
    }
  },
    GET_CATEGORY_SUCCESS: (state, action) => {
    console.log('aa',action)
    return{
        data:action.payload
    }
  },
  CREATE_CATEGORY_RESET: (state, action) => {
    console.log('aa',action)
    return{
        ...state,
        isupdated:false
    }
  },
  UPDATE_CATEGORY_RESET: (state, action) => {
    console.log('aa',action)
    return{
        ...state,
        isupdated:false
    }
  },
  CREATE_CATEGORY_FAIL:(state,action)=>{
    return{
      ...state,   
    }    
  },
  UPDATE_CATEGORY_FAIL:(state,action)=>{
    return{
      ...state,   
    }    
  },
  GET_CATEGORY_FAIL:(state,action)=>{
    return{
      ...state, 
    }    
  },
});
const updatecategoryReducer = createReducer(initialState, {
    CREATE_CATEGORY_REQUEST:(state,action)=>{
        return{
            ...state,
            loading: true,
        }
    },
    DELETE_CATEGORY_REQUEST:(state,action)=>{
        return{
            ...state,
            loading: true,
        }
    },
    UPDATE_CATEGORY_REQUEST:(state,action)=>{
        return{
            ...state,
            loading: true,
        }
    },
   
    UPDATE_CATEGORY_SUCCESS: (state, action) => {
    console.log('aa',action)
    return{
      updatedate:action.payload,
        isupdated:true
    }
  },
    DELETE_CATEGORY_SUCCESS: (state, action) => {
    console.log('aa',action)
    return{
      updatedate:action.payload,
      isdeleted:true
        
    }
  },
 
  UPDATE_CATEGORY_RESET: (state, action) => {
    console.log('aa',action)
    return{
        ...state,
        isupdated:false
    }
  },
  DELETE_CATEGORY_RESET: (state, action) => {
    console.log('aa',action)
    return{
        ...state,
        isdeleted:false
    }
  },
 
  UPDATE_CATEGORY_FAIL:(state,action)=>{
    return{
      ...state,   
    }    
  },
  DELETE_CATEGORY_FAIL:(state,action)=>{
    return{
      ...state,   
    }    
  },

});

export { createcategoryReducer ,updatecategoryReducer};
