import React from "react";
import "./InputForm.css";

const InputForm = () => {
  return (
    <div>
          <p className="f3 center">{"This is the blablabla"}</p>
          <div className="center searchline">
              <input type="text" className="f4 pa2 w-70 center"/>
              <button className=" center grow f4 w-25 link ph3 pv2 dib br1 black">Detect</button>
          </div>
    </div>
  );
};
export default InputForm;