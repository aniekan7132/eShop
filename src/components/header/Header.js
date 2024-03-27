import React, { useEffect, useState } from "react";
import classes from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
//  import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";
import { REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import ShowOnLogIn, { ShowOnLogout } from "../hiddenLink/HiddenLink";

const logo = (
  <div className={classes.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={classes.cart}>
    <Link to="/cart">
      Cart <FaShoppingCart fontSize={20} />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${classes.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const dispatch = useDispatch();
  
  const navigate = useNavigate();


  // Monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // const uid = user.uid;

        if(user.displayName === null) {
          // const u1 = user.email.slice(0, -10);
          const emailUsername = user.email.indexOf("@");
          const u1 = user.email.substring(0, emailUsername);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
          setDisplayName(uName)
        }else {
          setDisplayName(user.displayName);
        }       

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userId: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {/* <ToastContainer />  */}
      <header>
        <div className={classes.header}>
          {logo}

          <nav
            className={
              showMenu ? `${classes["show-nav"]}` : `${classes["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${classes["nav-wrapper"]} ${classes["show-nav-wrapper"]}`
                  : ``
              }
              onClick={hideMenu}
            ></div>

            <ul onClick={hideMenu}>
              <li className={classes["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>

            <div className={classes["header-right"]} onClick={hideMenu}>
              <span className={classes.links}>
                <ShowOnLogout>
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                </ShowOnLogout>
                <ShowOnLogIn>
                  <a href="#" style={{ color: "#ff7722"}}>
                    <FaUserCircle size={16} /> Hi, {displayName}
                  </a>
                </ShowOnLogIn>
                {/* <NavLink to="/register" className={activeLink}>
                  Register
                </NavLink> */}
                <ShowOnLogIn>
                  <NavLink to="/order-history" className={activeLink}>
                    My Orders
                  </NavLink>
                </ShowOnLogIn>
                <ShowOnLogIn>
                  <NavLink to="/order-history" onClick={logoutUser}>
                    Logout
                  </NavLink>
                </ShowOnLogIn>
              </span>
              {cart}
            </div>
          </nav>

          <div className={classes["menu-icon"]}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
