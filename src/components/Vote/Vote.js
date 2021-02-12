import React, { useState, useEffect } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import Candidat from "../Candidat/Candidat";
import { axiosInstance } from "../../App";
import Dashboard from "../Dashboard/Dashboard";
import Resultat from "../Resultat/Resultat";

const Vote = ({ id, finished }) => {
  const [candidats, setCandidats] = useState([]);
  const [vota, setVota] = useState(1);
  const [returne, setReturne] = useState(false);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    window.sessionStorage.setItem("votecourant", 0);
    axiosInstance
      .get("/votes/reponses", {
        params: { id: id },
        headers: {
          Authorization: window.sessionStorage.getItem("token"), //header pour gerer les permissions au backend
        },
      })
      .then((resp) => {
        setCandidats(resp.data.res);
        setVota(resp.data.vota);
      });
  }, []);

  const items = [];

  candidats.forEach((elt, key) => {
    items.push(
      <Col key={key} sm={12} md={12} lg={4}>
        <Candidat name={elt.reponse} id={elt.id}></Candidat>
      </Col>
    );
  });
  function voter() {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 500);
    if (window.sessionStorage.getItem("votecourant") != 0) {
      axiosInstance
        .post(
          "/votes/voter",
          {
            idquestion: id,
            idreponse: window.sessionStorage.getItem("votecourant"),
            compt: window.sessionStorage.getItem("role") == "m" ? 1 : 2,
          },
          {
            headers: {
              Authorization: window.sessionStorage.getItem("token"), //header pour gerer les permissions au backend
            },
          }
        )
        .then((resp) => {
          if (resp.data) {
            alert("Done");
            setReturne(true);
          } else {
            alert("Error");
          }
        });
    } else {
      alert("Select a candidate");
    }
  }
  if (returne) {
    return <Dashboard />;
  }
  if (finished == 1) {
    return <Resultat id={id} />;
  } else {
    return (
      <Container>
        <Row>{items}</Row>
        <Button
          disabled={clicked}
          className="log-button"
          onClick={() => {
            if (vota) {
              alert("deja voté");
            } else {
              voter();
            }
          }}
        >
          Soumettre
        </Button>
      </Container>
    );
  }
};

export default Vote;
