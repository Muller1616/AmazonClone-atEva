import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import classes from "./header.module.css";
import LowerHeader from "./LowerHeader";

const Header = () => {
  return (
    <>
      <section>
        <div className={classes.header_container}>
          {/* logo */}
          <div className={classes.logo_container}>
            <a href="#">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </a>

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

            <a href="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg/2560px-Flag_of_the_United_States_%28DDD-F-416E_specifications%29.svg.png"
                alt=""
              />
              <select name="" id="">
                <option>EN</option>
              </select>
            </a>
            {/* three components */}
            <a href="/">
              <p>Sign In</p>
              <span>Account & Lists</span>
            </a>
            {/* orders */}
            <a href="/">
              <p>returns</p>
              <span>& Orders</span>
            </a>
            {/* carts */}
            <a href="#" className={classes.cart}>
              <FaCartShopping size={25} />
              {/* icon */}
              <span>0</span>
            </a>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
};

export default Header;
