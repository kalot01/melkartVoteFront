import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../App";
import "./ajouterVote.css";
export default function AjouterVote() {
  const [question, setQuestion] = useState("");
  const [reponses, setReponses] = useState("");
  const [repTable, setRepTable] = useState([]);
  useEffect(() => {
    setRepTable(reponses.split(","));
  }, [reponses]);
  function addvote() {
    axiosInstance
      .post(
        "/votes/addvote",
        {
          question: question,
          reponses: repTable,
        },
        {
          headers: {
            Authorization: window.sessionStorage.getItem("token"), //header pour gerer les permissions au backend
          },
        }
      )
      .then((resp) => {
        if (resp.data) {
          alert("done");
        } else {
          alert("error");
        }
      });
  }
  return (
    <div className="ajouterVote-conatainer">
      <div>
        <input
          type="text"
          name="question"
          placeholder="Question"
          onChange={(event) => {
            setQuestion(event.target.value);
          }}
        />
        <textarea
          className="expandable"
          type="text"
          name="reponse"
          placeholder="reponses avec , entre chaque reponse"
          onChange={(event) => {
            setReponses(event.target.value);
          }}
        />
        <button onClick={addvote}>submit</button>
      </div>
    </div>
  );
}
