import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import Loader from "../Loader/Loader";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  }, []);
  return (
    <>
    {
        isLoading?(<Loader />) :( <div className={classes.product_container}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} renderAdd={true}/>
      ))}
    </div>)
    }
    </>
   
  );
};

export default Product;
