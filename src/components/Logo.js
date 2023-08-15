import React from "react";
import Tilt from "react-parallax-tilt";
import './Logo.css';
import pictureLogo from './pictureLogo.png'

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt>
        <div className="tilt">
          <img src={pictureLogo} alt="Logo" width='60px'/>
        </div>
      </Tilt>
    </div>
  );
};
export default Logo;
