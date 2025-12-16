import React from 'react'
import { IoMdMenu } from "react-icons/io";
import classes from "./header.module.css";

const LowerHeader = () => {
  return (
    <div className={classes.lower_container}>
        <ul>
            <li>
                <IoMdMenu size={20} />
                <p>
                    All
                </p>
            </li>
            <li>Today's Deals</li>
            <li>Customer Services</li>
            <li>Registry</li>
            <li>Gift Cards</li>
            <li>Sells</li>
        </ul>
    </div>
  )
}

export default LowerHeader