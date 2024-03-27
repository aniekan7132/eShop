import React from "react";
import classes from "./Card.module.scss";

const Card = ({ children, cardClass }) => {
  return <div className={`${classes.card} ${cardClass}`}>{children}</div>;
};

export default Card;
