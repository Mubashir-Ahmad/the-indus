import React, { useState } from 'react';
import './product.css';
// import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { addItem_tocart } from '../../actions/CartAction';

function Product({ product }) {
  // const alert = useAlert();
  const [quantities, setQuantities] = useState(product.products ? Array(product.products.length).fill(1) : []);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const increaseQuantity = (index) => {
    if (quantities[index] >= 5) return;
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const decreaseQuantity = (index) => {
    if (quantities[index] <= 1) return;
    const newQuantities = [...quantities];
    newQuantities[index] -= 1;
    setQuantities(newQuantities);
  };

  const addToCart = (id, quantity) => {
    dispatch(addItem_tocart(id, quantity));
    // alert.success('Item Added to cart');
  };

  const openPopup = (product, index) => {
    setSelectedProduct({ ...product, index }); // Store the selected product and its index
    setIsOpen(true);
  };

  const closePopup = () => {
    setSelectedProduct(null);
    setIsOpen(false);
  };

  return (
    <>
      <div className='all-pro'>
        <h6>{product.categoryName}</h6>
        <div className="itemss">
          {product.products.map((item, index) => (
            <div className={`productCard boox-1`} key={item._id}>
              <button className="text-cont" variant="outlined" color="primary" onClick={() => openPopup(item, index)}>
                Quick view
              </button>
              <div key={item.categoryName} className="itemss">
                <div>
                  <div className="image">
                    <img src={item.imageUrl} alt="Product" />
                  </div>
                  <div className="description">
                    <strong>{item.name}</strong>
                    <span>{item.price} PKR</span>
                    <div className="add-quantity">
                      <div className="quantity-controls">
                        <button onClick={() => decreaseQuantity(index)}>-</button>
                        <input value={quantities[index]} readOnly className="quantity-input" />
                        <button onClick={() => increaseQuantity(index)}>+</button>
                      </div>
                      <button onClick={() => addToCart(item._id, quantities[index])}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <div open={isOpen} onClose={closePopup} className="MuiDialog">
            <div className="dialogContentRow">
              <div className="img">
                <img src={selectedProduct.imageUrl} alt="Product" style={({borderRadius:'15px'})} />
              </div>
              <div className="descriptionn">
                <div className="cont">
                  <p style={({font:'300 1.7vmax Roboto'})}>{selectedProduct.name}</p>
                  <p style={({font:'300 1.4vmax Roboto'})}>{selectedProduct.description}</p>
                </div>
                <div className="instruction">
                  <h4 style={({font:'300 2vmax Roboto'})}>Cart</h4>
                  <div className='quick-viewww'>
                  <button onClick={() => decreaseQuantity(selectedProduct.index)}>-</button>
                  <input readOnly value={quantities[selectedProduct.index]} className="quantity-input" />
                  <button onClick={() => increaseQuantity(selectedProduct.index)}>+</button>
                </div>
                <button onClick={() => addToCart(selectedProduct._id, quantities[selectedProduct.index])}>Add to cart</button>
                </div>
              </div>
            </div>
    
            <button onClick={closePopup} color="primary">
              Close
            </button>
        </div>
      )}
    </>
  );
}

export default Product;
