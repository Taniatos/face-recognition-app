import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center img-box">
      {imageUrl && (
        <img
          id="inputImage"
          src={imageUrl}
          alt="Please enter a valid link"
          width="600px"
          height="auto"
        />
      )}

      {box && (
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      )}
    </div>
  );
};

export default FaceRecognition;
