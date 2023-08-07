import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SideBar from "./Sidebar";
import Metatitle from "../title/title";
import { useNavigate } from "react-router-dom";
import { updatetcategory } from "../../actions/categoryAction";
const Updatecategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { error, product } = useSelector((state) => state.productdetail);
    const { isupdated, products } = useSelector((state) => state.updatecategory);
    console.log(useSelector((state) => state.updatecategory))
    const [sorting, setSorting] = useState(0);
    const [active, setCheckbox] = useState(false);
    const [category, setCategory] = useState("");
    const categories = [
        "Chicken",
        "Biryani"
    ];

    const productId = useParams();
    console.log(productId.id)
    useEffect(() => {
        if (isupdated) {
            
            navigate("/admindashbord");
            dispatch({
                type: 'UPDATE_CATEGORY_RESET'
            });
        }
    }, [dispatch, error, isupdated, productId, product]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("id", productId.id);
        myForm.set("sorting", sorting);
        myForm.set("active", active);
        myForm.set("category", category);
        dispatch(updatetcategory(productId.id, myForm));
    };
    return (
        <Fragment>
            <Metatitle title="Update Category" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update Category</h1>

                        <div>
                            {/* <AccountTreeIcon /> */}
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
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
                                placeholder="sorting"
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
                        // disabled={loading ? true : false}
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Updatecategory;
