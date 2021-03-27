import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import JobService from "../services/jobservice";

const JobsList = (props) => {
  const [jobs, setJobs] = useState([]);
  const jobsRef = useRef();

  jobsRef.current = jobs;

  useEffect(() => {
    retrieveJobs();
  }, []);

  const retrieveJobs = () => {
    JobService.getAll()
      .then(response => {
        response.data.map(job => job.date = job.date.slice(0,10));
        setJobs(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

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
      <div className="col-md-12 list">
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
      </div>
    </div>
  );
}
export default JobsList;