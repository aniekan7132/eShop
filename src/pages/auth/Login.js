import { useState } from "react";
import classes from "./auth.module.scss";
import loginImg from "../../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLoading(false);
        navigate("/")
        toast.success("Login Succesfully...")
        console.log(user)
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // Login with Google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Login Successful.")
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <>
    <ToastContainer />
    {isLoading && <Loader />}
    <section className={`container ${classes.auth}`}>
      <div className={classes.img}>
        <img src={loginImg} alt="Login" width="400" />
      </div>

      <Card>
        <div className={classes.form}>
          <h2>Login</h2>
          <form onSubmit={loginUser}>
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
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
            <div className={classes.links}>
              <Link to="/reset-password">Reset Password</Link>
            </div>
            <p>-- or --</p>
          </form>
          <button className="--btn --btn-danger --btn-block" onClick={signInWithGoogle}>
            <FaGoogle color="#fff" /> Login With Google
          </button>
          <span className={classes.register}>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </section>
    </>
  );
};

export default Login;
