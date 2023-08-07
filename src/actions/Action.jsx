import axios from 'axios'

// Get all products
const getproduct = (keyword="",currentpage=1,price=[0,12000],category,ratings=0) => async (dispatch) => {
    dispatch({ type: 'product_request' });
    try {
        // console.log('dddd',price,currentpage,keyword)
        let link = `https://the-indus-beckend.vercel.app/api/v1/product?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        
        if(category){
             link =`https://the-indus-beckend.vercel.app/api/v1/product?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        const { data } = await axios.get(link)
        dispatch({
            type: 'product_success',
            payload: data,
            productCount: data.productCount,
            // filteredproductcount: data.filteredproductcount,
          });
       
    }
    catch (err) {
        console.log('errorrr',err);
        const errorMessage = err.response ? err.response.data.message : 'Unexpected error occurred';
        dispatch({
            type: 'product_fail',
            payload: errorMessage,
        });
    }
};
const getproducts = () => async (dispatch) => {
    dispatch({ type: 'products_request' });
    try {
        // console.log('dddd',price,currentpage,keyword)
        let link = 'https://the-indus-beckend.vercel.app/api/v1/products'
        
        const { data } = await axios.get(link)
        dispatch({
            type: 'products_success',
            payload: data,
            productCount: data.productCount,
            // filteredproductcount: data.filteredproductcount,
          });
       
    }
    catch (err) {
        console.log('errorrr',err);
        const errorMessage = err.response ? err.response.data.message : 'Unexpected error occurred';
        dispatch({
            type: 'products_fail',
            payload: errorMessage,
        });
    }
};
const clearError = () => async (dispatch) => {
    dispatch({
        type: 'error_clear',
    });
};
export { getproduct,getproducts , clearError };