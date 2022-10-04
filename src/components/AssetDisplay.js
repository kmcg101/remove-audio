import React, { useState, useEffect, useMemo } from "react";
import styles from "./AssetDisplay.module.scss";
import Dropzone from "../components/Dropzone";

function AssetDisplay({ droppedFile, width, label, clearDropzoneErrors, handleDropzoneErrors, handleDropzoneChanges }) {
  const height = (9 * width) / 16;

  const dropzoneAssetParent = {
    width: `${width}px`,
    height: `${height}px`,
    overflow: "hidden",
    position: "relative",
  };

  return (
    <div className={`${styles.relative} ${styles.bottomMargin}`}>
      <Dropzone noClick={false} clearDropzoneErrors={clearDropzoneErrors} handleDropzoneErrors={handleDropzoneErrors} handleDropzoneChanges={handleDropzoneChanges}></Dropzone>

      <div className={styles.labelText}>{label}</div>
      <div style={dropzoneAssetParent} className={styles.dropContainer}>
        {droppedFile?.size || droppedFile?.type?.includes("image") ? <img className={styles.newAsset} src={URL.createObjectURL(droppedFile)} alt=""></img> : null}
        {droppedFile?.size || droppedFile?.type?.includes("video") ? <video autoplay="true" loop className={styles.newAsset} src={URL.createObjectURL(droppedFile)} alt=""></video> : null}
      </div>
    </div>
  );
}
export default AssetDisplay;
