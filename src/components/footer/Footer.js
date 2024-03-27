import React from "react";
import classes from "./Footer.module.scss";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return <div className={classes.footer}>&copy; {year} All Rights Reserved</div>;
};

export default Footer;
