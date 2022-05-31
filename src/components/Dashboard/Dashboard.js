import React, { useState, useEffect } from "react";
import Pole from "../Pole/Pole";
import Vote from "../Vote/Vote";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../App";
import { selectVotant, setVotant } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [id, setId] = useState(0);
  const [votes, setVotes] = useState([]);
  const [finished, setFinished] = useState(0);
  const votant = useSelector(selectVotant);

  useEffect(() => {
    if (!window.sessionStorage.getItem("token")) {
      history.push("/");
    }
  }, []);
  useEffect(() => {
    if (votant == 1) {
      var inter = setInterval(() => {
        axiosInstance
          .get("/votes/questions", {
            headers: {
              Authorization: window.sessionStorage.getItem("token"), //header pour gerer les permissions au backend
            },
          })
          .then((resp) => {
            setVotes(resp.data);
          });
      }, 1000);
      return () => {
        clearInterval(inter);
      };
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
              dispatch(setVotant(1));
              clearInterval(inte);
            }
          });
        return () => {
          clearInterval(inte);
        };
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
          if (el.visible == 1) {
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
          }
        })}
      </Row>
    </Container>
  );
};

export default Dashboard;
