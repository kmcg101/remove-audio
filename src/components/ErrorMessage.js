import React from "react";
import styles from "./ErrorMessage.module.scss";
import XIcon from "../assets/icon_x.svg";

const iconX = {
  marginRight: "5px",
  marginTop: "2px",
  width: "25px",
  height: "25px",
  position: "relative",
  top: "5px",
};

const ErrorMessage = ({ errorMessageString, errorTextAnimationRun }) => {
  return (
    <div className="ErrorMessage">
      <div className={`${styles.errorText} ${styles.relativeCenterBody} ${errorTextAnimationRun ? styles.animateIt : ""}`}>
        {errorMessageString?.length > 0 ? <img style={iconX} src={XIcon} alt="back"></img> : null}
        {errorMessageString}
      </div>
    </div>
  );
};

export default ErrorMessage;
