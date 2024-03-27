import ReactDOM  from "react-dom";
import loaderImg from "../../assets/loader.gif";
import classes from "./Loader.module.scss";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={classes.wrapper}>
      <div className={classes.loader}>
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader") 
  );
};

export default Loader;
