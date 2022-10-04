import React from "react";
import styles from "./BackgroundImages.module.scss";
import bgFull from "../assets/bgFull.jpg";
import bgRight from "../assets/bgRight.png";
import bgLeft from "../assets/bgLeft.png";

export default function BackgroundImages() {
  return (
    <>
      {/* <div className="bg-bgFull     absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover"></div>
      <div className="bg-bgRight    absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover"></div>
      <div className="bg-bgLeft     absolute top-0 left-0 w-full h-full bg-no-repeat"></div> */}

      <img className={styles.backgroundImageFull} src={bgFull} />
      <img className={styles.backgroundImageFull} src={bgRight} />
      <img className={styles.backgroundImageSemi} src={bgLeft} />
    </>
  );
}
