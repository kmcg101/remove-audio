import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./AssetDisplay.module.scss";
import bgImage from "../assets/dropzoneBGImage.png";
import Dropzone from "../components/Dropzone";

function AssetDisplay({ droppedFile, width, label, clearDropzoneErrors, handleDropzoneErrors, handleDropzoneChanges }) {
  const height = (9 * width) / 16;
  const ref = useRef(null);

  const container = {
    position: "relative",
  };

  const dropzoneAssetParent = {
    width: `${width}px`,
    height: `${height}px`,
    overflow: "hidden",
    position: "relative",
    border: "1px black solid",
  };

  useEffect(() => {
    if (Object.keys(droppedFile).length > 0 && droppedFile.payload !== null) {
      // if this is a video, create a video tag
      if (droppedFile.payload.type.includes("video")) {
        const el = ref.current;
        const elemV = document.createElement("video");
        elemV.style = "position: absolute; width: 100%; height: 100%; left: 0px; object-fit: contain";

        elemV.autoplay = true;
        elemV.loop = true;
        elemV.src = URL.createObjectURL(droppedFile.payload);
        const options = { childList: true };
        while (el.firstChild) {
          el.removeChild(el.lastChild);
        }
        setTimeout(() => {
          el.appendChild(elemV);
        }, 100);
      } else {
        const elemI = document.createElement("img");
        elemI.style = "position: absolute; width: 100%; height: 100%; left: 0px; object-fit: contain";
        elemI.setAttribute("src", URL.createObjectURL(droppedFile.payload));
        const el = ref.current;
        while (el.firstChild) {
          el.removeChild(el.lastChild);
        }
        setTimeout(() => {
          el.appendChild(elemI);
        }, 100);
      }
    }
  }, [droppedFile.payload]);
  return (
    <div className={`${styles.relative} ${styles.bottomMargin}`}>
      <Dropzone noClick={false} clearDropzoneErrors={clearDropzoneErrors} handleDropzoneErrors={handleDropzoneErrors} handleDropzoneChanges={handleDropzoneChanges}></Dropzone>
      {/* `${this.state.className} ${this.props.content.divClassName}}` */}
      <div className={styles.labelText}>{label}</div>
      <div ref={ref} style={dropzoneAssetParent} className={styles.dropContainer}></div>
    </div>
  );
}
export default AssetDisplay;
