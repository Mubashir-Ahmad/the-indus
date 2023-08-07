import React, { useState, useEffect } from 'react'
import './home.css'
import { Link, NavLink } from 'react-router-dom'
import pic1 from '../../image/116.jpg'
import { getproducts, clearError } from '../../actions/Action';
import { useSelector, useDispatch } from 'react-redux'
import Product from '../product/Product';
import {load_user} from '../../actions/UserAction'
import Navbar from '../navbar/Navbar';
function Home() {
    const [showInfo, setShowInfo] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const handleClick = () => {
        setShowInfo(!showInfo); // Toggle the state value
    };

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleAddToCart = () => {
      setIsDrawerOpen(true);
    };
    const dispatch = useDispatch();
    const { loading, error, products, productCount } = useSelector(
        (state) => state.productts
    )
    console.log(useSelector((state) => state.productts))
    useEffect(() => {
        console.log('homee-authenticated',isAuthenticated)
        if (error) {
            dispatch(clearError)
        }
        dispatch(load_user());
        dispatch(getproducts());
    }, [dispatch, error])
    return (
        <>
            <div className="container-fluid">
                <div className="row row-1 mt-3">
                    <div className="hotel-name">
                        <h5>The Indus</h5>
                    </div>
                </div>
            </div>
            <h2 className='homeheading'>Menu</h2>
            <div className="containeer" id='containeer'>
                {products && products.map((item=>
                <>
                <Navbar isDrawerOpen={isDrawerOpen} />
                    <Product product= {item} onAddToCart={handleAddToCart} />
                    </>
                    ))}
                    
            </div>
        </>
    )
}

export default Home