import axios from 'axios'
import Cookies from 'js-cookie';
// Get all products
const getproduct = (keyword = "", currentpage = 1, price = [0, 12000], category, ratings = 0) => async (dispatch) => {
    dispatch({ type: 'product_request' });
    try {
        // console.log('dddd',price,currentpage,keyword)
        let link = `https://the-indus-beckend.vercel.app/api/v1/product?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if (category) {
            link = `https://the-indus-beckend.vercel.app/api/v1/product?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
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
        console.log('errorrr', err);
        const errorMessage = err.response ? err.response.data.message : 'Unexpected error occurred';
        dispatch({
            type: 'product_fail',
            payload: errorMessage,
        });
    }
};

// Get single product
const productdetail = (id) => async (dispatch) => {
    dispatch({ type: 'product_detail_request' });
    try {
        console.log('ee', id.id)
        const { product } = await axios.get(`https://the-indus-beckend.vercel.app/api/v1/product/${id.id}`)
            .then(res => {
                console.log('res', res.data.product)
                dispatch({
                    type: 'product_detail_success',
                    payload: res.data.product,
                });

            })
            .catch(error => {
                console.log(error);
                throw error;
            });

        console.log('pp', product);
    }
    catch (err) {
        // console.log('errorrrrrrr');
        const errorMessage = err.response ? err.response.product.message : 'Unexpected error occurred';
        dispatch({
            type: ' product_detail_fail',
            payload: errorMessage,
        });
    }
};
const clearError = () => async (dispatch) => {
    dispatch({
        type: 'error_clear',
    });
};
const getallcategory = () => async (dispatch) => {
    try {
        dispatch({ type: 'ALL_CATEGORY_REQUEST' });

        const { data } = await axios.get("https://the-indus-beckend.vercel.app/api/v1/category/get");
        
            console.log("Data_category",data)
        dispatch({
            type: 'ALL_CATEGORY_SUCCESS',
            payload: data
        });
    } catch (error) {
        console.log('error admin' , error)
        dispatch({
            type: 'ALL_CATEGORY_FAIL',
            payload: error.response.data.message,
        });
    }
};
const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch({ type: 'ADMIN_PRODUCT_REQUEST' });

        const { data } = await axios.get("https://the-indus-beckend.vercel.app/api/v1/admin/products");
        console.log(data)
        dispatch({
            type: 'ADMIN_PRODUCT_SUCCESS',
            payload: data.products,
        });
    } catch (error) {
        console.log('error admin' , error)
        dispatch({
            type: 'ADMIN_PRODUCT_FAIL',
            // payload: error.response.data.message,
        });
    }
};
// Create Product
 const createProduct = (productData) => async (dispatch) => {
    try {
        // console.log(productData)
      dispatch({ type: 'NEW_PRODUCT_REQUEST' });
  
      const token = Cookies.get('token');
      const config = { headers: { Authorization: `${token}` } };
  
      const { data } = await axios.post(`https://the-indus-beckend.vercel.app/api/v1/admin/product/new`,productData,config);
      console.log('product',data)
      dispatch({
        type: 'NEW_PRODUCT_SUCCESS',
        payload: data.result,
        message:data.message,
        success:data.success
      });
    } catch (error) {
        console.log(error)
      dispatch({
        type: 'NEW_PRODUCT_FAIL',
      
      });
    }
  };
  const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: 'UPDATE_PRODUCT_REQUEST' });
      const token = Cookies.get('token');
      const config = { headers: { Authorization: `${token}` ,"Content-Type":"application/json" } };
      const { data } = await axios.put(`https://the-indus-beckend.vercel.app/api/v1/update/product/${id}`,productData,config);
  
      dispatch({
        type: 'UPDATE_PRODUCT_SUCCESS',
        payload: data.product,
        success:data.success
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_PRODUCT_FAIL',
        // payload: error.response.data.message,
      });
    }
  };
  // Delete Product
 const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: 'DELETE_PRODUCT_REQUEST' });
  
      const { data } = await axios.delete(`https://the-indus-beckend.vercel.app/api/v1/admin/product/${id}`);
  console.log("data",data)
      dispatch({
        type: 'DELETE_PRODUCT_SUCCESS',
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: 'DELETE_PRODUCT_FAIL',
        // payload: error.response.data.message,
      });
    }
  };
  
export { getproduct, productdetail, clearError, getAdminProduct , getallcategory, createProduct,updateProduct,deleteProduct };
