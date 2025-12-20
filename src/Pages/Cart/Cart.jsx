import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./cart.module.css";

const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price  + amount;
  }, 0);

  return (
    <Layout>
      <section className={classes.container}>
        {/* LEFT SIDE */}
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />

          {basket?.length === 0 ? (
            <p>Opps ! No item in your cart</p>
          ) : (
            basket.map((item, index) => (
              <ProductCard
                key={index}
                product={item}
                renderAdd={false}
                renderDesc={true}
                flex={true}
              />
            ))
          )}
        </div>

        {/* RIGHT SIDE */}
        {basket?.length !== 0 && (
          <div className={classes.subtotal_wrapper}>
            <div className={classes.subtotal}>
              <p>Subtotal ({basket.length} items)</p>
              <CurrencyFormat amount={total} />

              <span className={classes.gift}>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>

              <Link to="/payments" className={classes.checkout}>
                Continue to checkout
              </Link>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Cart;
