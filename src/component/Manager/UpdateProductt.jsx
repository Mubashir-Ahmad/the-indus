import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  updateProduct,
  productdetail,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import SideBar from "./Sidebar";
import Metatitle from "../title/title";
import { useNavigate } from "react-router-dom";
const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { error, product } = useSelector((state) => state.productdetail);
  const { isUpdated, products } = useSelector((state) => state.updateproduct);
  console.log(useSelector((state) => state.updateproduct))
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [discount_price, setdiscount_price] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [avatar, setAvatar] = useState('');
  const[avatarPreview,setAvatarPreview]=useState()
  const categories = [
    "Chicken",
    "Biryani"
  ];

  const productId =  useParams();
  console.log(productId.id)
  useEffect(() => {
    if (isUpdated) {
      navigate("/admin/products");
      dispatch({
        type:'UPDATE_PRODUCT_RESET'
    });
    }
  }, [dispatch,error,isUpdated,productId,product]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", Stock);
    myForm.set("discount_price", discount_price);
    myForm.set("avatar", avatar);
    dispatch(updateProduct(productId.id, myForm));
  };

  const registerdatechange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } 
  };

  return (
    <Fragment>
      <Metatitle title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              {/* <SpellcheckIcon /> */}
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              {/* <AttachMoneyIcon /> */}
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              {/* <DescriptionIcon /> */}

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

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
              {/* <AccountTreeIcon /> */}
              <textarea
                placeholder="discount_price"
                value={discount_price}
                onChange={(e) => setdiscount_price(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              {/* <StorageIcon /> */}
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerdatechange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <button
              id="createProductBtn"
              type="submit"
              // disabled={loading ? true : false}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
