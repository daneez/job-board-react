import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Job from "./components/Job";
import JobsList from "./components/JobsList";

function App () {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/jobs"} className="navbar-brand">
            Job List
          </Link>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/jobs"]} component={JobsList} />
            <Route path="/jobs/:id" component={Job} />
          </Switch>
        </div>
      </div>
  );
}

export default App;
