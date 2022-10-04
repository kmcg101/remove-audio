import react from "react";
import styles from "./Header.module.scss";
import logo from "../assets/logo.svg";
import blueCheck from "../assets/blueCheck.svg";

function Header() {
  return (
    <div className={styles.relativeCenterBody}>
      <img className={styles.logoStyle} src={logo} />
      <div className={styles.headerTextStyle}>Audio Channel Remover</div>
    </div>
  );
}

export default Header;
