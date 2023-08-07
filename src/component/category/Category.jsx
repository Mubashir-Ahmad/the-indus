import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Product from '../product/Product';
import { getallcategory } from '../../actions/productAction';

function HomeCategories() {
    const dispatch = useDispatch();
    const {category} = useSelector((state)=>state.allcategory)
    console.log("category",useSelector((state)=>state.allcategory))
    useEffect(()=>{
        dispatch(getallcategory())
    })
  return (
    <>
    <h2>category</h2>
    </>
  )
}

export default HomeCategories