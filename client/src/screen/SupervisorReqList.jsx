import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { supervisorReqList } from "../actions/supervisorAction";
import Loader from "../component/Loader";
import SupervisorTable from "../component/SupervisorTable";
import Webcam from "react-webcam";
import { uploadImage, getAllImages } from "../actions/snapshots";

const SupervisorReqList = ({ history }) => {
  const { loading, supervisors, error } = useSelector(
    (state) => state.supervisorReqList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!supervisors) {
      dispatch(supervisorReqList());
    }
  }, []);

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState([]);

  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // setImgSrc(imageSrc);
    // console.log(typeof imageSrc);
    // uploadImage(
    //   "5ff99d564fc5cb5548ff2a63",
    //   "5ff99de74fc5cb5548ff2a64",
    //   imageSrc
    // );
    const images = await getAllImages(
      "5ffaa85f47ceb6585c25054b",
      "5ffaa89c47ceb6585c25054c"
    );
    console.log(images);
    setImgSrc(images);
  }, [webcamRef, setImgSrc]);

  //ReactDOM.render(<WebcamCapture />, document.getElementById("root"));

  // https://www.npmjs.com/package/react-webcam

  return (
    <>
      {loading && <Loader />}
      {supervisors && (
        <SupervisorTable supervisors={supervisors} permission={false} />
      )}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={480}
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc.length && imgSrc.map((i, j) => <img src={i} key={j} />)}
    </>
  );
};

export default SupervisorReqList;
