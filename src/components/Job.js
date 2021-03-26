import React, { Component } from "react";
import JobService from "../services/jobservice";

export default class Job extends Component {
  constructor(props) {
    super(props);
    this.getJob = this.getJob.bind(this);

    this.state = {
      currentJob: {
        title: "",
        location: "",
        date: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getJob(this.props.match.params.id);
  }

  getJob(id) {
    JobService.getOne(id)
      .then(response => {
        this.setState({
          currentJob: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentJob } = this.state;

    return (
      <div>
        {currentJob ? (
          <div className="edit-form">
            <h4>Job</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentJob.title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  value={currentJob.location}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Date:</strong>
                </label>
                {currentJob.date}
              </div>
            </form>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Job...</p>
          </div>
        )}
      </div>
    );
  }
}
