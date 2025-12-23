import React, { useState, useEffect, useContext } from "react";
import "./signup.module.css";
import { Link } from "react-router-dom";
import classes from "./signup.module.css";
import { auth } from "../../Utility/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { DataContext} from "../../components/DataProvider/DataProvider"
import { Type } from "../../Utility/action.type";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user },dispatch] = useContext(DataContext);
  console.log(user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.name);

    if(e.target.name === "signin"){
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        dispatch({
          type: Type.SET_USER,
          user: userCredential.user
        })

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.error('Error during sign in:', errorCode, errorMessage);
      });
      // sign in logic
    } else if(e.target.name === "signup"){

      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        dispatch({
          type: Type.SET_USER,
          user: userCredential.user
        })
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.error('Error during sign up:', errorCode, errorMessage);
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
      <Link>
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
            Sign In
          </button>
        </form>

        {/* agreement */}
        <p>
          <small>
            By continuing, you agree to Amazon's{" "}
            <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>
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
          Create your Amazon Account
        </button>
      </div>
    </section>
  );
};

export default Auth;
