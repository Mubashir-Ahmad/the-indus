import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  cartitems: [],
  shippinginfo:[]
};

const cartReducer = createReducer(initialState, {
  ADD_TO_CART: (state, action) => {
    console.log('aa',action)
    const item = action.payload;
    const isItemExist = state.cartitems.find((i) => i.product === item.product);
    if (isItemExist) {
      return {
        ...state,
        cartitems: state.cartitems.map((i) =>
          i.product === isItemExist.product ? item : i
        ),
      };
    } else {
      return {
        ...state,
        cartitems: [...state.cartitems, item],
      };
    }
  },
  DELETE_TO_CART:(state,action)=>{
    return{
      ...state,
      cartitems:state.cartitems.filter((i)=>i.product !== action.payload),
    }    
  },
  SAVE_SHIPPING_INFO:(state,action)=>{
    return{
      ...state,
      shippinginfo:action.payload
    }    
  }
});

export { cartReducer };
