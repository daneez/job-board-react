import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import JobService from "../services/jobservice";
import Spinner from "./Spinner";
import Pagination from "@material-ui/lab/Pagination";

const JobsList = (props) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const jobsRef = useRef();

  jobsRef.current = jobs;

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const pageSizes = [3, 6, 9];

  const getRequestParams = (page, pageSize) => {
    let params = {};
    
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    
    return params;
  }
  
  const retrieveJobs = () => {
    const params = getRequestParams(page, pageSize);

    JobService.getAll(params)
      .then(response => {
        const { jobs, totalPages } = response.data;

        jobs.map(job => job.date = job.date.slice(0,10));
        
        setJobs(jobs);
        setCount(totalPages);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(retrieveJobs, [page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const openJob = (rowIndex) => {
    const id = jobsRef.current[rowIndex].id;
    props.history.push("/jobs/" + id);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <button className="btn btn-success" onClick={() => openJob(rowIdx)}>
                View
              </button>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: jobs,
  });

  return (
    <div className="list row">
      {isLoading ? <Spinner /> : (
        <div className="col-md-12 job-list_table">
          <table
            className="table table-striped table-bordered"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="job-pagination_section mt-3">
            {"Jobs per Page: "}
            <select onChange={handlePageSizeChange} value={pageSize}>
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </div>
        </div>
    )}
    </div>
  );
}
export default JobsList;