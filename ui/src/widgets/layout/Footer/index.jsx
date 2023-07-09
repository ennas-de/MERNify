import React from "react";

import "./Footer.css";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="footer">
      <p>Footer</p>
      <br />
      <h6>&copy; MERNify {currentYear}</h6>
    </div>
  );
};

export default Footer;
