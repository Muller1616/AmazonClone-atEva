import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import classes from "./payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../Utility/firebase";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [{ user, basket }] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  // items total price
  const total =
    basket?.reduce((amount, item) => {
      return amount + item.price * item.amount;
    }, 0) || 0;

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (event) => {
    event.error?.message
      ? setCardError(event.error.message)
      : setCardError(null);
  };

  // handler function for form submit
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (!user?.uid) {
      setCardError("You must be logged in to place an order");
      setProcessing(false);
      return;
    }

    try {
      setProcessing(true);

      // 1. get client secret from backend
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      // 2. confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.log(result.error);
        setCardError(result.error.message);
        setProcessing(false);
        return;
      }

      const paymentIntent = result.paymentIntent;

      console.log("PaymentIntent:", paymentIntent);

      // 3. store order in Firestore
      // await db
      //   .collection("users")
      //   .doc(user?.uid)
      //   .collection("orders")
      //   .doc(paymentIntent.id)
      //   .set({
      //     basket: basket,
      //     amount: paymentIntent.amount,
      //     created: paymentIntent.created,
      //   });

      const db = getFirestore();
      await setDoc(
        doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      setProcessing(false);
      navigate("/orders",{state:{msg:"You have placed in the order!"}})
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) Items</div>

      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Addis Ababa, Ethiopia</div>
          </div>
        </div>

        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />

                <div className={classes.payment_price_container}>
                  <span style={{ display: "flex", gap: "10px" }}>
                    Total Order | <CurrencyFormat amount={total} />
                  </span>
                </div>

                <button type="submit">
                  {processing ? (
                    <div className={classes.processing}>
                      <ClipLoader size={15} color="#fff" />
                      <p>Please Wait...</p>
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
