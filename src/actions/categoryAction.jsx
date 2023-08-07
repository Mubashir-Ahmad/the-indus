import axios from "axios";
import Cookies from 'js-cookie';

const createcategory =(form)=>async(dispatch,getState)=>{
    try{
        const token = Cookies.get('token');
        dispatch({type:'CREATE_CATEGORY_REQUEST'})
        const config = { headers: { Authorization: `${token}` ,"Content-Type":"application/json" } };
        const data = await axios.post(`https://the-indus-beckend.vercel.app/api/v1/category/new`,form,config)
        console.log(data.data.success)
        dispatch({type:'CREATE_CATEGORY_SUCCESS',payload:data.data.result,success:data.data.success})
    }
    catch(error){
        dispatch({
            type:'CREATE_CATEGORY_FAIL',
            // payload:error.response.data.message
        })
    }
}
const getcategory =(form)=>async(dispatch,getState)=>{
    try{
        const token = Cookies.get('token');
        dispatch({type:'GET_CATEGORY_REQUEST'})
        const config = { headers: { Authorization: `${token}` ,"Content-Type":"application/json" } };
        const data = await axios.get('https://the-indus-beckend.vercel.app/api/v1/category/get')
        console.log(data.data.category)
        dispatch({type:'GET_CATEGORY_SUCCESS',payload:data.data.category})
    }
    catch(error){
        dispatch({
            type:'GET_CATEGORY_FAIL',
            // payload:error.response.data.message
        })
    }
}
const updatetcategory =(id,form)=>async(dispatch,getState)=>{
    try{
        const token = Cookies.get('token');
        dispatch({type:'UPDATE_CATEGORY_REQUEST'})
        const config = { headers: { Authorization: `${token}` ,"Content-Type":"application/json" } };
        const data = await axios.put(`https://the-indus-beckend.vercel.app/api/v1/category/update/${id}`,form)
        console.log(data.data.category)
        dispatch({type:'UPDATE_CATEGORY_SUCCESS',payload:data.data.category})
    }
    catch(error){
        dispatch({
            type:'UPDATE_CATEGORY_FAIL',
            // payload:error.response.data.message
        })
    }
}
const deletecategory =(id,form)=>async(dispatch,getState)=>{
    try{
        const token = Cookies.get('token');
        dispatch({type:'DELETE_CATEGORY_REQUEST'})
        const config = { headers: { Authorization: `${token}` ,"Content-Type":"application/json" } };
        const data = await axios.delete(`https://the-indus-beckend.vercel.app/api/v1/category/delete/${id}`,form)
        console.log(data.data.category)
        dispatch({type:'DELETE_CATEGORY_SUCCESS',payload:data.data.category})
    }
    catch(error){
        dispatch({
            type:'DELETE_CATEGORY_FAIL',
            // payload:error.response.data.message
        })
    }
}


export {createcategory, getcategory ,updatetcategory , deletecategory}