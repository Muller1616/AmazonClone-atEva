import { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./cart.module.css";
import { Type } from "../../Utility/action.type";
import { IoIosArrowUp } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";


const Cart = () => {
  const [{ basket },dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return amount + item.price * item.amount;
  }, 0);

  const increament = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

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
            basket.map((item, index) => {
              return (
                <section key={index} className={classes.cart_product}>
                  <ProductCard
                    product={item}
                    renderAdd={false}
                    renderDesc={true}
                    flex={true}
                  />

                  <div className={classes.btn_container}>
                    <button className={classes.btn} onClick={() => increament(item)}><IoIosArrowUp size={20} /></button>
                    <span>{item.amount}</span>
                    <button  className ={classes.btn} onClick={() => decrement(item.id)}><MdKeyboardArrowDown size={20}/></button>
                  </div>
                </section>
              );
            })
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

              <Link to="/payment" className={classes.checkout}>
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
