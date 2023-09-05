import React from "react";
import "./LandingPage.css";

const LandingPage = ({ onRouteChange }) => {
  return (
    <div className="container">
      <div className="left-side">
        <h2>Welcome to Face Recognition App</h2>
        <h1>VisioQuest</h1>
        <p>
          VisioQuest is designed to simplify the process of detecting faces in
          images.
          <br />
          Simply paste the image URL into the search field, and witness the
          magic of our face recognition technology in action. Explore it now!
        </p>
        <div className="buttons">
          <button onClick={() => onRouteChange("signin")} className="btn-left">
            Sign In
          </button>
          <button
            onClick={() => onRouteChange("register")}
            className="btn-right"
          >
            Register
          </button>
        </div>
      </div>
      <div className="right-side">
        <img
          src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/095/787/original/visioquestforapp3.png?1693857432"
          alt="VisioQuest"
        />
      </div>
    </div>
  );
};

export default LandingPage;
