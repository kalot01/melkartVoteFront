import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { axiosInstance } from "../../App";

const Resultat = ({ id }) => {
  const [states, setStates] = useState({
    dataHorizontal: {
      labels: [],
      datasets: [
        {
          label: "Résultats",
          data: [],
          fill: false,
          backgroundColor: [
            "rgba(255, 99, 132,0.8)",
            "rgba(255, 159, 64,0.8)",
            "rgba(255, 205, 86,0.8)",
            "rgba(75, 192, 192,0.8)",
            "rgba(54, 162, 235,0.8)",
            "rgba(153, 102, 255,0.8)",
            "rgba(201, 203, 207,0.8)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
  useEffect(() => {
    axiosInstance
      .get("/votes/reponses", {
        params: { id: id },
        headers: {
          Authorization: window.sessionStorage.getItem("token"), //header pour gerer les permissions au backend
        },
      })
      .then((resp) => {
        states.dataHorizontal.labels = [];
        states.dataHorizontal.datasets[0].data = [];
        for (let i = 0; i < resp.data.res.length; i++) {
          states.dataHorizontal.labels.push(resp.data.res[i].reponse);
          states.dataHorizontal.datasets[0].data.push(resp.data.res[i].nbvotes);
        }
        setTimeout(() => {
          setStates(states);
        }, 500);
      });
  }, []);

  return (
    <MDBContainer>
      <h3 className="mt-5">Results</h3>
      <HorizontalBar
        data={states.dataHorizontal}
        options={{
          responsive: true,
          legend: { display: false },
          scales: {
            xAxes: [
              {
                ticks: {
                  min: 0, // Edit the value according to what you need
                },
              },
            ],
            yAxes: [
              {
                stacked: true,
              },
            ],
          },
        }}
      />
    </MDBContainer>
  );
};

export default Resultat;
