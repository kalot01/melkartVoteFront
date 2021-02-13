import "./App.css";

import NavigationPage from "./NavigationPage/NavigationPage";
import Connexion from "./components/Connexion/Connexion";
import Inscription from "./components/Inscription/Inscription";
import GestionMembres from "./components/GestionMembres/GestionMembres";
import GestionVotes from "./components/GestionVotes/GestionVotes";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
export let axiosInstance = axios.create({
  baseURL: "http://51.210.42.254:7967/api",
  Headers: {
    "Content-Type": "application/json",
  },
});
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Connexion}></Route>
        <Route path="/inscription" component={Inscription}></Route>
        <Route path="/dashboard" component={NavigationPage}></Route>
        {/* <Route
          exact
          path="/dashboard/members"
          component={GestionMembres}
        ></Route>
        <Route exact path="/dashboard/votes" component={GestionVotes}></Route> */}
      </Switch>
    </div>
  );
}

export default App;
