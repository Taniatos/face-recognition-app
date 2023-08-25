import React from "react";
import "./InputForm.css";

const InputForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3 center">
        {"Vision Quest App detects faces in your pictures. Give it a try!"}
      </p>
      <div className="center searchline">
        <input
          type="text"
          className="f4 pa2 w-70 center"
          onChange={onInputChange}
        />
        <button
          className="center grow f4 w-25 link ph3 pv2 dib br1 black"
          onClick={onButtonSubmit}
          id="btnDetect"
        >
          Detect
        </button>
      </div>
    </div>
  );
};
export default InputForm;
