import http from "../http-common";

const getAll = () => {
  return http.get("/jobs");
};

const getOne = (id) => {
  return http.get(`/jobs/${id}`)
};

const JobService = {
  getAll,
  getOne
};

export default JobService;