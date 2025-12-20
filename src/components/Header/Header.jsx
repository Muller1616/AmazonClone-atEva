import React, { useContext } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import classes from "./header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

const Header = () => {
  const [{basket},dispatch] = useContext(DataContext)
  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          {/* logo */}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>

            <div className={classes.delivery}>
              {/* delivery */}
              <span>
                <CiLocationOn />
              </span>
              <div>
                <p>Delivered to:</p>
                <p>Ethiopia</p>
              </div>
            </div>
          </div>

          {/* search section */}
          <div className={classes.search}>
            <select name="" id="">
              <option>All</option>
            </select>
            <input type="text" name="" id="" placeholder="search product" />
            <IoSearchOutline size={25} />
          </div>

          {/* other section */}
          <div className={classes.order_container}>
            {/* right side link */}

            <Link to = "#" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg/2560px-Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg.png"
                alt=""
              />
              <select name="" id="">
                <option>EN</option>
              </select>
            </Link>
            {/* three components */}
            <Link to = "/signup">
              <p>Sign In</p>
              <span>Account & Lists</span>
            </Link>
            {/* orders */}
            <Link to = "/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            {/* carts */}
            <Link to = "/cart" className={classes.cart}>
              <FaCartShopping size={25} />
              {/* icon */}
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
