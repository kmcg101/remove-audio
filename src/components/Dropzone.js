import React, { useState, useEffect, useMemo, useRef, createRef } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./Dropzone.module.scss";
import { getInfo } from "react-mediainfo";

const maxFileSize = 20000000;

function Dropzone({ handleDropzoneChanges, handleDropzoneErrors, clearDropzoneErrors, noClick }) {
  const [files, setFiles] = useState([]);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    maxFiles: 1,
    noClick: noClick,
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "video/mp4": [".mp4"],
    },
    onDropRejected: (rejectedFiles) => {
      console.log("rejected");
      clearDropzoneErrors();
      handleDropzoneErrors("Only JPG, PNG, MP4 files accepted.");
    },
    onDropAccepted: (acceptedFiles) => {
      console.log("accepted");
      clearDropzoneErrors();
      setFiles(
        acceptedFiles.map((myfile) =>
          Object.assign(myfile, {
            preview: URL.createObjectURL(myfile),
          })
        )
      );
      const newFile = acceptedFiles[0];

      const newInfo = getInfo(newFile).then((result) => {
        const ac = result.media.track[0].AudioCount;
        const acNumber = parseInt(ac);
        const width = result.media.track[1].Width;
        const height = result.media.track[1].Height;
        const aspectRatio = width / height; // 1.778
        const fixedAspectRatio = aspectRatio.toFixed(2);
        const frameRate = result.media.track[1].FrameRate;

        const fileSize = result.media.track[0].FileSize;
        const duration = result.media.track[0].Duration;

        // reject if video is not 16:9.  Warn if audio channel or > 20MB

        // 16:9 ratio required, file not loaded | file size should not exceed 20mb, currently: 42mb | file cannot include audio channel!

        // acNumber will always be of type Number and value either an integer or NaN
        if (acNumber > 0) {
          handleDropzoneErrors("file should not include audio channel");
        }
        if (fixedAspectRatio !== "1.78") {
          handleDropzoneErrors("16:9 ratio required");
        } else {
          handleDropzoneChanges(newFile);
        }
        if (fileSize > maxFileSize) {
          console.log("file size test error");
          let divisor = newFile.size > 1000000000 ? 1000000000 : 1000000;
          let suffix = newFile.size > 1000000000 ? "gb" : "mb";

          const fixedSize = Math.round(newFile.size / divisor);
          handleDropzoneErrors(`file size should not exceed 20mb, currently: ${fixedSize}${suffix}`);
        }
      });
    },
  });

  return (
    <section className={styles.container}>
      <div {...getRootProps({ className: `dropzone ${styles.dropzoneContainer}` })}>
        <input {...getInputProps()} />
      </div>
    </section>
  );
}
export default Dropzone;
