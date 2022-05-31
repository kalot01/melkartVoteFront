import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import melkart from "../../assets/melkart.png";
import { axiosInstance } from "../../App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Connexion.css";
import { useDispatch } from "react-redux";
import { setRole, setVotant } from "../../redux/slices/userSlice";
const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.sessionStorage.getItem("token")) {
      history.push("/dashboard");
    }
  }, []);
  function connect() {
    axiosInstance
      .post("/login", {
        email: email,
        password: password,
      })
      .then((resp) => {
        if (resp.data.err) {
          alert(resp.data.err);
        } else {
          window.sessionStorage.setItem("token", resp.data.token);
          dispatch(setRole(resp.data.role));
          dispatch(setVotant(resp.data.votant));
          history.push("/dashboard");
        }
      });
  }
  return (
    <div id="login-box">
      <div className="left" id="left">
        <h1>Login</h1>
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button className="log-button" onClick={connect}>
          login
        </Button>
        <Button
          className="log-button"
          onClick={() => history.push("/inscription")}
        >
          sign up
        </Button>
      </div>
      <div className="right" id="right">
        <img src={melkart} width="240px" alt="" />
      </div>
    </div>
  );
};

export default Connexion;
