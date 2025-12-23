import React, { useState, useEffect, useContext } from "react";
import "./signup.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import classes from "./signup.module.css";
import { auth } from "../../Utility/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

import { ClipLoader } from "react-spinners";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState({
    signin: false,
    signup: false,
  });


  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.name);

    if (e.target.name === "signin") {
      setLoading({ ...loading, signin: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          dispatch({
            type: Type.SET_USER,
            user: userCredential.user,
          });
          setMessage("Sign in successful");

          setLoading({ ...loading, signin: false });
          navigate("/");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          setMessage("");
          setLoading({ ...loading, signin: false });
        });
      // sign in logic
    } else if (e.target.name === "signup") {
      setLoading({ ...loading, signup: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          dispatch({
            type: Type.SET_USER,
            user: userCredential.user,
          });
          setLoading({ ...loading, signup: false });
          setMessage("Account created successfully");
          setError("");
          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          setLoading({ ...loading, signup: false });
        });
      // sign up logic
    }
    // firebase login
  };

  // console.log(password)
  // console.log(email)

  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to = {"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="amazon logo"
        />
      </Link>

      {/* form */}

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="muller@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            name="signin"
            onClick={handleSubmit}
            className={classes.login_signinBtn}
          >
            {loading.signin ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* agreement */}
        <p>
          <small>
            By continuing, you agree to Amazon's{" "}
            <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=508088">
              Conditions of Use
            </a>{" "}
            and{" "}
            <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496">
              Privacy Notice
            </a>
            .
          </small>
        </p>
        {/* button account btn */}
        <button
          type="submit"
          name="signup"
          onClick={handleSubmit}
          className={classes.login_registerBtn}
        >
          {loading.signup ? (
            <ClipLoader size={20} color="#fff" />
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {/* error display */}
      
        {error && <p style={{ color: "red", paddingTop: "10px" }}>{error}</p>}

        {message && <p style={{ color: "green", paddingTop: "10px" }}>{message}</p>}
      </div>
    </section>
  );
};

export default Auth;
