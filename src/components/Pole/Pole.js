import React, { useState, useEffect } from "react";
import "./Pole.css";

const Pole = (props) => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    setTitle(props.title);
  }, []);

  return (
    <div className="card" onClick={props.callable}>
      <img src="" style={{ width: "100%" }} />
      <div className="container">
        <h4>
          <b>{title}</b>
        </h4>
      </div>
    </div>
  );
};

export default Pole;
