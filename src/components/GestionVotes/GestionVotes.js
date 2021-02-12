import React, { useState, useEffect } from "react";
import AjouterVote from "../ajouterVote/ajouterVote";
import { axiosInstance } from "../../App";
export default function GestionVotes() {
  const [ajout, setAjout] = useState(false);
  const [votes, setVotes] = useState([]);
  useEffect(() => {
    //var int = setInterval(() => {
    axiosInstance
      .get("/votes/questions", {
        headers: {
          Authorization: window.sessionStorage.getItem("token"), //header pour gerer les permissions au backend
        },
      })
      .then((resp) => {
        setVotes(resp.data);
      });
    // }, 100);
  }, []);
  function finish(id) {
    axiosInstance
      .post(
        "/votes/finish",
        {
          id: id,
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
          alert("Erreur");
        }
      });
  }
  if (ajout) {
    return <AjouterVote />;
  }
  return (
    <div className='gestion-bg'>
      <button
        onClick={() => {
          setAjout(true);
        }}
      >
        ajouter un vote
      </button>
      <div>
        {votes.map((el, key) => {
          return (
            <div key={key}>
              <span>{el.ques}</span>
              <button
                onClick={() => {
                  finish(el.id);
                }}
                style={{ visibility: el.finished == 0 ? "visible" : "hidden" }}
              >
                finish
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
