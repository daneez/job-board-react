import http from "../http-common";

const getAll = (params) => {
  return http.get("/jobs", { params });
};

const getOne = (id) => {
  return http.get(`/jobs/${id}`)
};

const JobService = {
  getAll,
  getOne
};

export default JobService;