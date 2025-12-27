import React, { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { db } from "../../Utility/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { DataContext } from "../../components/DataProvider/DataProvider";
import classes from "./orders.module.css";
import ProductCard from "../../components/Product/ProductCard";
const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          <div>
            {
              orders?.length === 0  && <div style={{padding:"20px"}}>You don't have any order yet</div> 
              
            }
          </div>
          {/* ordered items */}
          <div>
            {orders?.map((eachOrder,i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder.id}</p>
                  {
                    eachOrder?.data?.basket?.map((order =>(
                      <ProductCard key={order.id} product={order} flex={true}/>
                    )))
                  }
                  <div />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Orders;
