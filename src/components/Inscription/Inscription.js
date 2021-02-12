import React, { useState } from "react";
import "./Inscription.css";
import { Button, Img } from "bootstrap-react";
import melkart from "../../assets/melkart.png";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../App";
import "bootstrap/dist/css/bootstrap.min.css";
const Inscription = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const history = useHistory();
  function signup() {
    if (password == confirmPassword) {
      axiosInstance
        .post("/register", {
          email: email,
          password: password,
          nom: nom,
          prenom: prenom,
        })
        .then((resp) => {
          if (resp.data) {
            history.push("/");
          }
        });
    } else {
      alert("check password and confirm password");
    }
  }
  return (
    <div id="login-box">
      <div className="left">
        <h1>Sign up</h1>
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
        <input
          type="password"
          name="password2"
          placeholder="Retype password"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
        <input
          type="text"
          name="nom"
          placeholder="nom"
          onChange={(event) => {
            setNom(event.target.value);
          }}
        />
        <input
          type="text"
          name="prenom"
          placeholder="prenom"
          onChange={(event) => {
            setPrenom(event.target.value);
          }}
        />
        <Button className="log-button" onClick={signup}>
          Sign up!
        </Button>
      </div>
      <div className="right">
        <img src={melkart} width="240px" />
      </div>
    </div>
  );
};

export default Inscription;
