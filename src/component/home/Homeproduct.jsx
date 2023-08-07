import React, { useState, useEffect } from 'react'
import './home.css'
import { Link, NavLink } from 'react-router-dom'
import pic1 from '../../image/116.jpg'
import { getproducts, clearError, getproduct } from '../../actions/Action';
import { useSelector, useDispatch } from 'react-redux'

import Products from '../product/Products';
import { useParams } from 'react-router-dom';
function Homeproduct() {
    const [showInfo, setShowInfo] = useState(false);
    const { keyword } = useParams();
    const handleClick = () => {
        setShowInfo(!showInfo); // Toggle the state value
    };

    
    const dispatch = useDispatch();
    const { loading, error, products, productCount } = useSelector(
        (state) => state.products
    )
    console.log(useSelector((state) => state.products))
    useEffect(() => {
        if (error) {
    
            dispatch(clearError)
        }
        dispatch(getproduct(keyword))
    }, [dispatch,keyword ,error])
    return (
        <>
            <div className="container-fluid">
                <div className="row row-1 mt-3">
                    <div className="hotel-name">
                        <h2>The Indus</h2>
                    </div>
                </div>
            </div>
            <h2 className='homeheading'>Menu</h2>
            <div className="container" id='container'>
                {products && products.map((item=>
                    <Products product= {item} />
                    ))}
            </div>
        </>
    )
}

export default Homeproduct