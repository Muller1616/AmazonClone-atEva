import axios from 'axios'
import React, {useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import classes from './product.module.css'

const Product = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
        .then(res =>{
            setProducts(res.data)
        } ).catch(err => console.log(err))

    }, [])
  return (
    <div className={classes.product_container}>
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
        
    </div>
  )
}

export default Product