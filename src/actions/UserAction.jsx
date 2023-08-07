import axios from 'axios'
import Cookies from 'js-cookie';

const login = (email, password) => async (dispatch) => {
    dispatch({ type: 'login_request' })
    try {
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`https://the-indus-beckend.vercel.app/api/v1/login`, { email, password }, config)
            .then((res) => {
                console.log('ress',data, res)
                dispatch({ type: 'login_success', payload: res.data })
                const token = res.data.token;
                Cookies.set('token', token);
            }).catch((err) => {
                console.log('sss', err.response.data.message)
                dispatch({
                    type: 'login_fail',
                    payload: err.response.data.message
                })
            })
    }
    catch (error) {
        console.log(error)
    }
}
const register = (userData) => async (dispatch) => {
    dispatch({ type: 'register_request' })
    try {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };

        console.log('ddddd', userData)
        const { data } = await axios.post(`https://the-indus-beckend.vercel.app/api/v1/register`, userData, config)
            .then((res) => {
                console.log('resss', res)
                dispatch({ type: 'register_success', payload: res.data })
            })
            .catch((err) => {
                console.log(err)
                // console.log("error:",err.response.data.message)
                dispatch({ type: 'register_fail', payload: err.response.data.message })
            })
    }
    catch (error) {
        // console.log(error)
    }
}
const adminregister = (userData) => async (dispatch) => {
    dispatch({ type: 'register_request' })
    try {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };

        console.log('ddddd', userData)
        const { data } = await axios.post(`https://the-indus-beckend.vercel.app/api/v1/admin/register`, userData, config)
            .then((res) => {
                console.log('resss', res)
                dispatch({ type: 'register_success', payload: res.data })
            })
            .catch((err) => {
                console.log(err)
                // console.log("error:",err.response.data.message)
                dispatch({ type: 'register_fail', payload: err.response.data.message })
            })
    }
    catch (error) {
        // console.log(error)
    }
}

// Load user in redux
const load_user = () => async (dispatch) => {
    try {
        dispatch({ type: 'load_user_request' });
        const token = Cookies.get('token');
        console.log('load-user-token',token)
        const config = { headers: { Authorization: `${token}` } };
        console.log('first', config)
        const { data } = await axios.get(`https://the-indus-beckend.vercel.app/api/v1/me`, config);
        console.log('sa', data)
        dispatch({ type: 'load_user_success', payload: data });
    } catch (error) {
        console.log('load-user-error',error);
        dispatch({ type: 'load_user_fail' });
    }
};

//   Logout user
const logout_user = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`https://the-indus-beckend.vercel.app/api/v1/logout`);
        dispatch({ type: 'logout_success', payload: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: 'logout_fail' });
    }
};
//   update_profile
const update_profile = (userData) => async (dispatch) => {

    try {
        dispatch({ type: 'update_profile_request' })
        const token = Cookies.get('token');
        const config = { headers: { Authorization: `${token}`, "Content-Type": "multipart/form-data" } };
        const { data } = await axios.put(`https://the-indus-beckend.vercel.app/api/v1/me/update`, userData, config)
            .then((res) => {
                console.log('res', res.data.user)
                dispatch({ type: 'updated_profile_success', payload: res.data.success })
            })
            .catch((err) => {
                console.log(err)
                dispatch({ type: 'updated_profile_fail', payload: err.response.data.message })
            })
    }
    catch (error) {
        console.log(error)
    }
}

// update password
const update_password = (password) => async (dispatch) => {
    try {
        dispatch({ type: 'update_password_request' })
        const token = Cookies.get('token');
        const config = { headers: { Authorization: `${token}`, "Content-Type": "application/json" } };
        const { data } = await axios.put(`https://the-indus-beckend.vercel.app/api/v1/password/update`, password, config)
            .then((res) => {
                console.log('res', res.data.user)
                dispatch({ type: 'updated_password_success', payload: res.data.success })
            })
            .catch((err) => {
                console.log(err.response.data.message)
                dispatch({ type: 'updated_password_fail', payload: err.response.data.message })
            })
    }
    catch (error) {
        // console.log(error)
    }
}
// forget password
const forget_password = (email) => async (dispatch) => {
    try {
        dispatch({ type: 'forget_password_request' })
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`https://the-indus-beckend.vercel.app/api/v1/password/forget`, email, config)
            .then((res) => {
                console.log('res', res.data.user)
                dispatch({ type: 'forget_password_success', payload: res.data.message })
            })
            .catch((err) => {
                console.log(err.response.data.message)
                dispatch({ type: 'forget_password_fail', payload: err.response.data.message })
            })
    }
    catch (error) {
        // console.log(error)
    }
}
// Reset password
const reset_password = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: 'reset_password_request' })
        const config = { headers: { "Content-Type": "application/json" } }
        console.log(passwords)
        const { data } = await axios.put(`https://the-indus-beckend.vercel.app/api/v1/password/reset/${token}`, passwords, config)
            .then((res) => {
                console.log('res', res.data)
                dispatch({ type: 'reset_password_success', payload: res.data.success })
            })
            .catch((err) => {
                console.log(err.response.data.message)
                dispatch({ type: 'reset_password_fail', payload: err.response.data.message })
            })
    }
    catch (error) {
        // console.log(error)
    }
}
const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: 'ALL_USERS_REQUEST' });
        const { data } = await axios.get(`https://the-indus-beckend.vercel.app/api/v1/admin/user`);
        dispatch({ type: 'ALL_USERS_SUCCESS', payload: data.users });
    } catch (error) {
        dispatch({
            type: 'ALL_USERS_FAIL',
            //    payload: error.data.message 
        });
    }
};
// get  User Details
const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_DETAILS_REQUEST' });
        const { data } = await axios.get(`https://the-indus-beckend.vercel.app/api/v1/admin/user/${id}`);

        dispatch({ type: 'USER_DETAILS_SUCCESS', payload: data.user });
    } catch (error) {
        dispatch({ type: 'USER_DETAILS_FAIL', payload: error.response.data.message });
    }
};
// Update User
 const updateUser = (id, userData) => async (dispatch) => {
    try {
        console.log(id)
      dispatch({ type: ' updated_profile_request' });
        
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(`https://the-indus-beckend.vercel.app/api/v1/update/user/${id}`, userData);

        console.log('data',data)
      dispatch({ type: 'updated_profile_success', payload: data.success });
    } catch (error) {
        console.log(error)
      dispatch({
        type: 'updated_profile_fail',
        // payload: error.response.data.message,
      });
    }
  };
// Delete User
 const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: 'DELETE_USER_REQUEST' });
  
      const { data } = await axios.delete(`https://the-indus-beckend.vercel.app/api/v1/admin/user/${id}`);
  console.log(data)
      dispatch({ type: 'DELETE_USER_SUCCESS', 
      payload: data.message,
        data:data.data
    });
    } catch (error) {
      dispatch({
        type: 'DELETE_USER_FAIL',
        // payload: error.response.data.message,
      });
    }
  };
const clearError = () => async (dispatch) => {
    dispatch({
        type: 'error_clear',
    });
};

export { login, register, clearError, load_user, deleteUser,updateUser,logout_user, update_profile, update_password, forget_password, reset_password, getAllUsers, adminregister, getUserDetails }