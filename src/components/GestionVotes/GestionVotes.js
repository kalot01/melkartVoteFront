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
  function begin(id) {
    axiosInstance
      .post(
        "/votes/begin",
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

  function visible(id) {
    axiosInstance
      .post(
        "/votes/visible",
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

  function hide(id) {
    axiosInstance
      .post(
        "/votes/hide",
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
    <div className="gestion-bg">
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
                  if (el.finished == 0) {
                    finish(el.id);
                  } else {
                    begin(el.id);
                  }
                }}
              >
                {el.finished == 0 ? "finish" : "begin"}
              </button>
              <button
                onClick={() => {
                  if (el.visible == 0) {
                    visible(el.id);
                  } else {
                    hide(el.id);
                  }
                }}
              >
                {el.visible == 0 ? "make visible" : "hide"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
