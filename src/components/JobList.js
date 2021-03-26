import React, { Component } from "react";
import JobService from "../services/jobservice";
import { Link } from "react-router-dom";

export default class JobList extends Component {
  constructor(props) {
    super(props);
    this.setActiveJob = this.setActiveJob.bind(this);
    this.state = {
      Jobs: [],
      currentJob: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveJobs();
  }

  retrieveJobs() {
    JobService.getAll()
      .then(response => {
        this.setState({
          Jobs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  setActiveJob(Job, index) {
    this.setState({
      currentJob: Job,
      currentIndex: index
    });
  }

  render() {
    const { Jobs, currentJob, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Jobs List</h4>

          <ul className="list-group">
            {Jobs &&
              Jobs.map((Job, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveJob(Job, index)}
                  key={index}
                >
                  {Job.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentJob ? (
            <div>
              <h4>Job</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentJob.title}
              </div>
              <div>
                <label>
                  <strong>Location:</strong>
                </label>{" "}
                {currentJob.location}
              </div>
              <div>
                <label>
                  <strong>Date:</strong>
                </label>{" "}
                {currentJob.date}
              </div>

              <Link
                to={"/Jobs/" + currentJob.id}
                className="badge badge-warning"
              >
                View
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Job...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
