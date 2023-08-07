import React, { useState } from "react";
import "./pop.css";
import Cartt from "../cart/Cartt";

const Popup = (props) => {
  const [isActive, setIsActive] = useState(false);

  const togglePopup = () => {
    setIsActive(!isActive);
  };

  const popupStyle = {
    position: "fixed",
    width: "29vw",
    margin: "auto",
    marginTop: "auto",
    height: "100%",
    maxHeight: "100%",
    marginTop: "calc(86vh - 85vh - 20px)",
    background: "#fff",
    borderRadius: "4px",
    padding: "20px",
    border: "1px solid #999",
    overflow: "auto",
    transform: `translateX(${isActive ? "0%" : "100%"})`, // Apply the transform style based on isActive
    right: 0,
    transition: "all .4s ease",
  };

  return (
    <div>
      <button onClick={togglePopup}>Toggle Popup</button>
      <div style={popupStyle} className={isActive ? "boxxx active" : "boxxx"}>
        <i className="fa-solid fa-xmark close-icon" onClick={togglePopup}></i>
        <b className="pop-heading">THE INDUS</b>
        <Cartt />
        {props.content}
      </div>
      <i className="fa-solid fa-xmark close-icon" onClick={togglePopup}></i>
    </div>
  );
};

export default Popup;
