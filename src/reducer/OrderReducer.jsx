import { createReducer } from '@reduxjs/toolkit';
import produce from 'immer';
const initialState = {
  orders: [],
  order: [],
  dorders:[],
};

const SaleOrderReducer = createReducer(initialState, {
  SALE_ORDER_REQUEST: (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },
  SALE_ORDER_SUCCESS: (state, action) => {
    console.log('sdddddddddddddd',action.payload)
    return {
      loading: false,
      Todaysale: action.payload.todaySales.totalSales,
      Weeklysale: action.payload.weeklySales.totalSales,
      Monthlysale: action.payload.monthlySales.totalSales,
      Yearlysale: action.payload.yearlySales.totalSales,
      Lifetimesale: action.payload.yearlySales.totalSales,
    };
  },
  SALE_ORDER_FAIL: (state, action) => {
    return {
      loading: true,
      error: action.payload,
    };
  },
  CLEAN_ERROR: (state, action) => {
    return {
      ...state,
      error: null,
    };
  },
});
const OrderReducer = createReducer(initialState, {
  CREATE_ORDER_REQUEST: (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },
  CREATE_ORDER_SUCCESS: (state, action) => {
    return {
      loading: false,
      order: action.payload,
    };
  },
  CREATE_ORDER_FAIL: (state, action) => {
    return {
      loading: true,
      error: action.payload,
    };
  },
  CLEAN_ERROR: (state, action) => {
    return {
      ...state,
      error: null,
    };
  },
});

const MyOrderReducer = createReducer(initialState, { 
  MY_ORDER_REQUEST: (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },
  MY_ORDER_SUCCESS: (state, action) => {
    console.log("action", action.payload);
    return {
      loading: false,
      orders: action.payload, // Change from order to orders
      
      
    };
  },
  ALL_ORDERS_SUCCESSS: (state, action) => {
    console.log("action", action.payload);
    return {
      loading: false,
      oorders: action.payload.placedorder, // Change from order to orders
      order:action.payload.dispatchedorder,
      dorders:action.payload.deliveredorder,
      porder:action.payload.processingorder
    };
  },
  MY_ORDER_FAIL: (state, action) => {
    return {
      loading: true,
      error: action.payload,
    };
  },
  CLEAN_ERROR: (state, action) => {
    return {
      ...state,
      error: null,
    };
  },
});
const allOrdersReducer =createReducer(initialState, {

     ALL_ORDERS_REQUEST:(state,action) => {
      return {
        loading: true,
      };
    },
    ALL_ORDERS_SUCCESS :(state,action)=>{
      console.log('action',action.payload)
      return {
        loading: false,
        orders: action.payload,
      };
    },
    
    ALL_ORDERS_FAIL: (state,action)=>{
      return {
        loading: false,
        error: action.payload,
      };
    },
    CLEAR_ERRORS :(state,action)=>{
      return {
        ...state,
        error: null,
      };
  },
})
const SingleOrderReducer = createReducer(initialState, {
  SINGLE_ORDER_REQUEST: (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },
  SINGLE_ORDER_SUCCESS: (state, action) => {
    console.log(action)
    return {
      ...state,
      loading: false,
      order: action.payload.order, // Update to set the order data
      totalprice:action.payload.totalPrice,
      shippingInfo:action.payload.shippingInfo
    };
  },
  SINGLE_ORDER_FAIL: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  CLEAR_ERRORS: (state, action) => {
    return {
      ...state,
      error: null,
    };
  },
});
const PickOrderReducer = createReducer(initialState, {
  PICK_ORDER_REQUEST: (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },
  PICK_ORDER_SUCCESS: (state, action) => {
    console.log(action)
    return {
      ...state,
      loading: false,
      message: action.payload
    };
  },
  PICK_ORDER_FAIL: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  CLEAR_ERRORS: (state, action) => {
    return {
      ...state,
      error: null,
    };
  },
});
const RiderearnReducer = createReducer(initialState, {
  RIDER_EARN_REQUEST: (state, action) => {
    return {
      ...state,
      loading: true,
    };
  },
  RIDER_EARN_SUCCESS: (state, action) => {
    console.log(action)
    return {
      ...state,
      loading: false,
      message: action.payload.message,
      orders: action.payload.orders,
      totalEarnings:action.payload.totalEarnings,
      totalOrders:action.payload.totalOrders
    };
  },
  RIDER_EARN_FAIL: (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  CLEAR_ERRORS: (state, action) => {
    return {
      ...state,
      error: null,
    };
  },
});
const UpdateorderReducer =createReducer (initialState, {
 
     UPDATE_ORDER_REQUEST:(state,action)=>{
  return {
        ...state,
        loading: true,
        isUpdated:false
      };
    },
    DELETE_ORDER_REQUEST:(state,action)=>{
  return {
        ...state,
        loading: true,
        isdeleted:false
      };
    },
    DELETE_ORDER_SUCCESS:(state , action)=>{
      return {
        ...state,
        loading: false,
        isdeleted: action.payload,
      };
    },
     UPDATE_ORDER_SUCCESS:(state , action)=>{
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
     UPDATE_ORDER_FAIL:(state ,action)=>{
      return {
        ...state,
        loading: false,
        error: action.payload,
        isUpdated:false
      };
    },
    DELETE_ORDER_FAIL:(state ,action)=>{
      return {
        ...state,
        loading: false,
        error: action.payload,
        isdeleted:false
      };
    },
    UPDATE_ORDER_RESET:(state , action)=>{
      return {
        ...state,
        isUpdated: false,
      };
    },
     DELETE_ORDER_RESET:(state ,action)=>{
      return {
        ...state,
        isdeleted: false,
      };},

    CLEAR_ERROR:(state, action)=>{
      return {
        ...state,
        error: null,
      };
    } 
});
export { OrderReducer, RiderearnReducer,UpdateorderReducer ,MyOrderReducer, allOrdersReducer,SingleOrderReducer,PickOrderReducer,SaleOrderReducer};
