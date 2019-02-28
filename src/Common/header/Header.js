import React from "react";

import logo from "../../Common/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="Header">
      <div className="container">
        <img src={logo} alt="logo" className="Header-logo" />
      </div>
    </div>
  );
};

export default Header;
