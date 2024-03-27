import React, { useState } from "react";
import classes from "./auth.module.scss";
import Card from "../../components/card/Card";
import registerImg from "../../assets/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // const auth = getAuth()

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setIsLoading(false);
        console.log(user);
        toast.success("Registration Succesful...");
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${classes.auth}`}>
        <Card>
          <div className={classes.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register{" "}
              </button>
            </form>

            <span className={classes.register}>
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>

        <div className={classes.img}>
          <img src={registerImg} alt="Login" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
