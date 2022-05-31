import React from "react";
import { useDispatch } from "react-redux";
import { setVoteCourant } from "../../redux/slices/userSlice";
import "./Candidat.css";

const Candidat = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="candidat-container">
      <h3>{props.name}</h3>
      <input
        id={props.id}
        className="radio-custom"
        name="radio-group"
        onChange={(event) => {
          dispatch(setVoteCourant(event.target.id));
        }}
        type="radio"
      />
      <label htmlFor={props.id} className="radio-custom-label"></label>
      <div className="candidat-checkBox">&nbsp;</div>
    </div>
  );
};

export default Candidat;
