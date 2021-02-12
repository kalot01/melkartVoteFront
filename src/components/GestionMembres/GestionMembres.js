import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../App";
import "./GestionMembre.css";

export default function GestionMembres() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    var int = setInterval(() => {
      axiosInstance
        .get("/votes/members", {
          headers: {
            Authorization: window.sessionStorage.getItem("token"), //header pour gerer les permissions au backend
          },
        })
        .then((resp) => {
          setMembers(resp.data);
        });
    }, 5000);
  }, []);
  function rendreVotant(id) {
    axiosInstance
      .post(
        "/votes/membervote",
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
          alert("error");
        }
      });
  }
  return (
    <div className="gestion-bg">
      {members.map((el, key) => {
        return (
          <div key={key}>
            <span>{el.nom} </span>
            <span>{el.prenom} </span>
            <span>{el.email} </span>
            <button
              onClick={() => {
                rendreVotant(el.id);
              }}
            >
              rendre votant
            </button>
          </div>
        );
      })}
    </div>
  );
}
