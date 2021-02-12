import React from "react";
import "./Candidat.css";

const candidat = (props) => {
  return (
    <div className="candidat-container">
      <h3>{props.name}</h3>
      <input
        id={props.id}
        className="radio-custom"
        name="radio-group"
        onChange={(event) => {
          window.sessionStorage.setItem("votecourant", event.target.id);
        }}
        type="radio"
      />
      <label htmlFor={props.id} className="radio-custom-label"></label>
      <div className="candidat-checkBox">&nbsp;</div>
    </div>
  );
};

export default candidat;
