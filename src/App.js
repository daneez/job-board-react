import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Job from "./components/Job";
import JobsList from "./components/JobList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/jobs"} className="navbar-brand">
          Job List
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/jobs"} className="nav-link">
              Jobs
            </Link>
          </li>
        </div>
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
