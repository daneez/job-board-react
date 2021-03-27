import React, { useState, useEffect } from "react";
import JobService from "../services/jobservice";

const Job = props => {
  const initialJobState = {
    id: null,
    title: "",
    description: "",
    location: "",
    date: "",
    applicants: ""
  };
  const [currentJob, setCurrentJob] = useState(initialJobState);

  const getJob = id => {
    JobService.getOne(id)
      .then(response => {
        response.data.date = response.data.date.slice(0,10);
        setCurrentJob(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getJob(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div>
      {currentJob ? (
        <div className="job-detail__form">
          <h4>Job Detail</h4>
          <form>
            <div className="job-detail__form-item">
              <label htmlFor="title">
                <strong>Title:</strong>
              </label>{" "}
              {currentJob.title}
            </div>
            <div className="job-detail__form-item">
              <label htmlFor="description">
                <strong>Description:</strong>
              </label>{" "}
              {currentJob.description}
            </div>
            <div className="form-group">
              <label htmlFor="location">
                <strong>Location:</strong>
              </label>{" "}
              {currentJob.location}
            </div>
            <div className="form-group">
              <label htmlFor="date">
                <strong>Date:</strong>
              </label>{" "}
              {currentJob.date}
            </div>
            <div className="form-group">
              <label htmlFor="applicants">
                <strong>Applicants:</strong>
              </label>{" "}
              {currentJob.applicants}
            </div>
          </form>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Job;