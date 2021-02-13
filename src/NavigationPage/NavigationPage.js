import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import melkart from "../assets/melkart.png";
import "./NavigationPage.css";
import Dashboard from "../components/Dashboard/Dashboard";
import { Link } from "react-router-dom";
import Vote from "../components/Vote/Vote";
import { useHistory } from "react-router-dom";
import GestionMembres from "../components/GestionMembres/GestionMembres";
import GestionVotes from "../components/GestionVotes/GestionVotes";
const NavigationPage = () => {
  const history = useHistory();
  const callable = () => {
    history.push("/dashboard");
  };
  return (
    <div id="main-container">
      <Navbar bg="light" expand="lg">
        <Link to="/dashboard">
          <Navbar.Brand>
            <img src={melkart} width="100px" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link
              to="/dashboard"
              className="nav-link"
              role="button"
              onClick={() => {
                window.location.reload();
              }}
            >
              Home
            </Link>
            {window.sessionStorage.getItem("role") == "b" ? (
              <Link to="/dashboard/members" className="nav-link" role="button">
                Accepter les Membres
              </Link>
            ) : (
              <></>
            )}
            {window.sessionStorage.getItem("role") == "b" ? (
              <Link to="/dashboard/votes" className="nav-link" role="button">
                Gestion des votes
              </Link>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
        <Button
          onClick={() => {
            window.sessionStorage.removeItem("token");
            history.push("/");
          }}
          variant="outline-primary"
          className="logout-btn"
        >
          Logout
        </Button>
      </Navbar>
      <div
        className={
          window.sessionStorage.getItem("role") == "b"
            ? "main-root bg-chedli"
            : "main-root"
        }
      >
        {history.location.pathname == "/dashboard" ? (
          <Dashboard />
        ) : history.location.pathname == "/dashboard/votes" ? (
          <GestionVotes />
        ) : history.location.pathname == "/dashboard/members" ? (
          <GestionMembres />
        ) : (
          <></>
        )}
      </div>
      <div className="footer">©Powred by Streamliners 2021</div>
    </div>
  );
};

export default NavigationPage;
