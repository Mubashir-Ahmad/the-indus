import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, createProduct } from "../../actions/productAction";
import { createcategory } from "../../actions/categoryAction";
import Metatitle from "../title/title";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from "./Sidebar";
import { newProductReducer } from "../../reducer/productReducer";
import { useNavigate } from "react-router-dom";
const NewProduct = ({ history }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.user);

    const { loading, error, isupdated} = useSelector((state) => state.categorycreate);
    console.log(useSelector((state) => state.categorycreate));

    const [sorting, setSorting] = useState(0);
    const [active, setCheckbox] = useState(false);
    const [category, setcategory] = useState("");



    useEffect(() => {
        if(!isAuthenticated)
    {
      navigate('/login')
    }

        if (isupdated) {
            toast.success('🦄 Updated Succeessfully!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                }); 
            navigate("/admindashbord");
            dispatch({type:'CREATE_CATEGORY_RESET'})
        }
    }, [dispatch, error, history,isupdated,toast]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

      
        myForm.append("sorting", sorting);
        myForm.append("active", active);
        myForm.append("category", category);


        dispatch(createcategory(myForm));
    };

    
    const categories = [
        "Chicken",
        "biryani"
    ];
    return (
        <Fragment>
            <Metatitle title="Create Category" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Category</h1>
                        <div>
                            <select
                                value={category}
                                onChange={(e) => setcategory(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            {/* <AttachMoneyIcon /> */}
                            <input
                                type="shorting"
                                placeholder="Price"
                                required
                                onChange={(e) => setSorting(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => setCheckbox(e.target.checked)}
                                />
                                Active
                            </label>
                        </div>
                        <button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                   pauseOnHover
                  theme="light"
          />
        </Fragment>
        
    );
};

export default NewProduct;
