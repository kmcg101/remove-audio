// git add .
// git commit -m "first commit"
// git@github.com:CaptivateLLC/captivate-ad-preview.git

// git remote add origin git@github.com:CaptivateLLC/captivate-ad-preview.git
// git push origin dev

// git remote set-url origin git@github.com:CaptivateLLC/captivate-ad-preview.git

/*
required custom header for Amplify
customHeaders:
  - pattern: '*.*'
    headers:
      - key: Cross-Origin-Embedder-Policy
        value: require-corp
      - key: Cross-Origin-Opener-Policy
        value: same-origin

*/

import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./App.module.scss";
import Header from "./components/Header";
import Dropzone from "./components/Dropzone";
import AssetDisplay from "./components/AssetDisplay";
import DroppedFileAttributes from "./components/DroppedFileAttributes";
import BackgroundImages from "./components/BackgroundImages";
import ErrorMessage from "./components/ErrorMessage";
import Footer from "./components/Footer";
import separator from "./assets/separator.svg";

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

function App() {
  const [droppedFile, setDroppedFile] = useState({});
  const [errorMessageArray, setErrorMessageArray] = useState([]);
  const [errorMessageString, setErrorMessageString] = useState();
  const [errorTextAnimationRun, setErrorTextAnimationRun] = useState(false);

  const ffmpeg = createFFmpeg({
    log: true,
  });
  // const load = async () => {
  //   await ffmpeg.load();
  // };
  // useEffect(() => {
  //   load();
  // });

  const handleDropzoneChanges = (name, value) => {
    setDroppedFile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDropzoneErrors = (text) => {
    setErrorTextAnimationRun(true);
    setTimeout(() => {
      setErrorTextAnimationRun(false);
    }, "5000");
    setErrorMessageArray((oldArray) => [...oldArray, text]);
  };

  const clearDropzoneErrors = () => {
    setErrorMessageArray([]);
  };

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      let newString = "";
      for (var i = 0; i < errorMessageArray.length; i++) {
        let val = errorMessageArray[i];
        if (i === 0) {
          newString = val;
        } else {
          newString += ` |  ${val}`;
        }
      }
      setErrorMessageString(newString);
    } else if (isMounted.current === false) {
      isMounted.current = true;
    }
  }, [errorMessageArray]);

  const removeAudioChannel = async (e) => {
    console.log("click3");
    await ffmpeg.load();
    // // this works on command line:   ffmpeg -i "audio.mp4" -c copy -an "noaudio.mp4"
    ffmpeg.FS("writeFile", "noAudio.mp4", await fetchFile(droppedFile.payload));
    await ffmpeg.run("-framerate", "1/10", "-i", "noAudio.mp4", "-c:v", "libx264", "-t", "10", "-pix_fmt", "yuv420p", "-vf", "scale=1920:1080", "test.mp4");
    const data = ffmpeg.FS("readFile", "noAudio.mp4");
    console.log("finished");
    // setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" })));
  };

  return (
    <div className={styles.App}>
      <Dropzone noClick={true} clearDropzoneErrors={clearDropzoneErrors} handleDropzoneErrors={handleDropzoneErrors} handleDropzoneChanges={handleDropzoneChanges}></Dropzone>
      <BackgroundImages></BackgroundImages>
      <Header></Header>

      <div className={styles.displayContainer}>
        <AssetDisplay handleDropzoneErrors={handleDropzoneErrors} handleDropzoneChanges={handleDropzoneChanges} clearDropzoneErrors={clearDropzoneErrors} label="Elevator (480x270)" droppedFile={droppedFile} width={480}></AssetDisplay>
        <img className={styles.separator} src={separator}></img>
        <AssetDisplay handleDropzoneErrors={handleDropzoneErrors} handleDropzoneChanges={handleDropzoneChanges} clearDropzoneErrors={clearDropzoneErrors} label="Large Format Display (768x432)" droppedFile={droppedFile} width={768}></AssetDisplay>
      </div>
      <Footer></Footer>
      <ErrorMessage errorTextAnimationRun={errorTextAnimationRun} droppedFile={droppedFile} errorMessageString={errorMessageString}></ErrorMessage>
      <button className={styles.audioChannelButton} onClick={removeAudioChannel}></button>
    </div>
  );
}

export default App;
