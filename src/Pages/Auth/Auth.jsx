import React from "react";
import "./signup.module.css";
import { Link } from "react-router-dom";
import classes from "./signup.module.css";

const Auth = () => {
  return <section className={classes.login}>
    {/* logo */}
    <Link>
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="amazon logo" />
    </Link>

    {/* form */}

    <div className={classes.login_container}>
      <h1>Sign In</h1>
      <form action="">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="muller@gmail.com"/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="" />
        </div>
        
        <button className={classes.login_signinBtn}>Sign In</button>
      </form>

      {/* agreement */}
      <p><small>By continuing, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.</small></p>
      {/* button account btn */}
      <button className={classes.login_registerBtn}>Create your Amazon Account</button>
    </div>
  </section>;
};

export default Auth;
