import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = () => {
  return (
    <div className="center img-box">
      <img
        src={`https://samples.clarifai.com/metro-north.jpg`}
        alt="Face Recognition"
      />
    </div>
  );
};
export default FaceRecognition;
