import React, { useState, useEffect } from "react";
import Pole from "../Pole/Pole";
import Vote from "../Vote/Vote";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../App";

const Dashboard = () => {
  const history = useHistory();
  const [id, setId] = useState(0);
  const [votes, setVotes] = useState([]);
  const [finished, setFinished] = useState(0);
  useEffect(() => {
    if (!window.sessionStorage.getItem("token")) {
      history.push("/");
    }
  }, []);
  useEffect(() => {
    if (window.sessionStorage.getItem("votant") == 1) {
      var int = setInterval(() => {
        axiosInstance
          .get("/votes/questions", {
            headers: {
              Authorization: window.sessionStorage.getItem("token"), //header pour gerer les permissions au backend
            },
          })
          .then((resp) => {
            setVotes(resp.data);
          });
      }, 3000);
    } else {
      var inte = setInterval(() => {
        axiosInstance
          .get("/votes/votant", {
            headers: {
              Authorization: window.sessionStorage.getItem("token"), //header pour gerer les permissions au backend
            },
          })
          .then((resp) => {
            if (resp.data) {
              window.sessionStorage.setItem("votant", 1);
              clearInterval(inte);
            }
          });
      }, 3000);
    }
  }, []);
  if (id != 0) {
    return <Vote id={id} finished={finished} />;
  }
  return (
    <Container>
      <Row>
        {votes.map((el, key) => {
          return (
            <Col key={key} lg={4} md={6} sm={12}>
              <Pole
                title={el.ques}
                callable={() => {
                  setFinished(el.finished);
                  setId(el.id);
                }}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Dashboard;
