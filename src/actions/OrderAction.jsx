import axios from "axios";
import Cookies from 'js-cookie';


const createorder =(order)=>async(dispatch,getState)=>{
    try{
        console.log(order)
        const token = Cookies.get('token');
        dispatch({type:'CREATE_ORDER_REQUEST'})
        const config = { headers: { Authorization: `${token}` ,"Content-Type":"application/json" } };
        const data = await axios.post(`https://the-indus-beckend.vercel.app/api/v1/order/new`,order,config)
        console.log(data)
        dispatch({type:'CREATE_ORDER_SUCCESS',payload:data})
    }
    catch(error){
        dispatch({
            type:'CREATE_ORDER_FAIL',
            // payload:error.response.data.message
        })
    }
}
const myorders =(order)=>async(dispatch,getState)=>{
    try{
        const token = Cookies.get('token');
        dispatch({type:'MY_ORDER_REQUEST'})
        const config = { headers: { Authorization: `${token}`} };
        const data = await axios.get(`https://the-indus-beckend.vercel.app/api/v1/orders/me`,config)
        console.log('dataaaa',data,data.data.order)
        dispatch({type:'MY_ORDER_SUCCESS',payload:data.data.order})
    }
    catch(error){
        dispatch({
            type:'MY_ORDER_FAIL',
            // payload:error.response.data.message
        })
    }
}
const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: 'ALL_ORDERS_REQUEST' });
  
      const { data } = await axios.get("https://the-indus-beckend.vercel.app/api/v1/admin/orders");
      dispatch({ type: 'ALL_ORDERS_SUCCESS', payload: data.orders });
    } catch (error) {
      dispatch({
        type: 'ALL_ORDERS_FAIL',
        // payload: error.response.data.message,
      });
    }
  };
const getadminAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: 'ALL_ORDERS_REQUEST' });
  
      const { data } = await axios.get("https://the-indus-beckend.vercel.app/api/v1/admin/orders");
      dispatch({ type: 'ALL_ORDERS_SUCCESSS', payload: data });
    } catch (error) {
      dispatch({
        type: 'ALL_ORDERS_FAIL',
        // payload: error.response.data.message,
      });
    }
  };
const getsingleorder = (id) => async (dispatch) => {
    try {
      console.log('wertyuiuytrertyui',id)
      dispatch({ type: 'SINGLE_ORDER_REQUEST' });
  
      const { data } = await axios.get(`https://the-indus-beckend.vercel.app/api/v1/order/${id}`)
      .then(res => {
        console.log('res', res.data)
        dispatch({ type: 'SINGLE_ORDER_SUCCESS', payload: res.data });
      console.log(data)
      
    }).catch(error => {
      throw error;
  })
}
     catch (error) {
      dispatch({
        type: 'SINGLE_ORDER_FAIL',
        // payload: error.response.data.message,
      });
    }
  };
const pickorder = (id) => async (dispatch) => {
    try {
      const token = Cookies.get('token');
      dispatch({ type: 'PICK_ORDER_REQUEST' });
      const config = { headers: { Authorization: `${token}`} };
      const { data } = await axios.put(`https://the-indus-beckend.vercel.app/api/v1/rider/order/pick/${id}`,config)
      .then(res => {
        console.log('res', res.data.message)
        dispatch({ type: 'PICK_ORDER_SUCCESS', payload: res.data.message });
      console.log(data)
      
    }).catch(error => {
      console.log(error);
      throw error;
  })
}
     catch (error) {
      dispatch({
        type: 'PICK_ORDER_FAIL',
        // payload: error.response.data.message,
      });
    }
  };
const riderearn = (id) => async (dispatch) => {
    try {
      const token = Cookies.get('token');
      dispatch({ type: 'RIDER_EARN_REQUEST' });
      const config = { headers: { Authorization: `${token}`} };
      const { data } = await axios.get(`https://the-indus-beckend.vercel.app/api/v1/rider/earn/order`,config)
      .then(res => {
        console.log('res', res.data)
        dispatch({ type: 'RIDER_EARN_SUCCESS', payload: res.data });
      console.log(data)
      
    }).catch(error => {
      console.log(error);
      throw error;
  })
}
     catch (error) {
      dispatch({
        type: 'RIDER_EARN_FAIL',
        // payload: error.response.data.message,
      });
    }
  };
// Update Order
 const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_ORDER_REQUEST' });
    const token = Cookies.get('token');
    const config = { headers: { Authorization: `${token}`, "Content-Type": "application/json" } };
    const { data } = await axios.put(`https://the-indus-beckend.vercel.app/api/v1/admin/orders/${id}`,order,config);

    dispatch({ type: 'UPDATE_ORDER_SUCCESS', payload: data.success });
  } catch (error) {
    dispatch({
      type: 'UPDATE_ORDER_FAIL',
      // payload: error.response.data.message,
    });
  }
};
// Delete Order
 const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_ORDER_REQUEST' });
    const token = Cookies.get('token');
    const config = { headers: { Authorization: `${token}`, "Content-Type": "application/json" } };
    const { data } = await axios.delete(`https://the-indus-beckend.vercel.app/api/v1/admin/order/${id}`,config);

    dispatch({ type: 'DELETE_ORDER_SUCCESS', payload: data.success });
  } catch (error) {
    dispatch({
      type: 'DELETE_ORDER_FAIL',
      // payload: error.response.data.message,
    });
  }
};
// Delete Order
 const salesOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'SALE_ORDER_REQUEST' });
    const token = Cookies.get('token');
    const config = { headers: { Authorization: `${token}`, "Content-Type": "application/json" } };
    const { data } = await axios.get('https://the-indus-beckend.vercel.app/api/v1/admin/sale/order',config);
    console.log('dataa',data)
    dispatch({ type: 'SALE_ORDER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'SALE_ORDER_FAIL',
      // payload: error.response.data.message,
    });
  }
};
const clearError = () => async (dispatch) => {
    dispatch({
        type: 'CLEAN_ERROR',
    });
};

export{clearError,createorder,myorders,getAllOrders,getsingleorder,pickorder,riderearn,updateOrder,deleteOrder,getadminAllOrders,salesOrder}