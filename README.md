## Intro

This is the client application for job board, built from [Create React App](https://github.com/facebook/create-react-app).

### Technology
  + React 17
  + react-router-dom 5.2.0
  + react-table 7.6.3
  + axios 0.21.1
  + bootstrap 4.6.0
  + material-ui 4

## Source Code Structure
### job-board-react
| File Directory | Description |
| ----- | ------  |
| src/components | define each react component( JobsList, Job, Spinner) |
| src/services | CRUD services use axios to send HTTP requests (Retrieve: getAll, getOne) |
| src/app.js | define navigation and routes to each component |
| src/index.js | react dom render starting point |
| .env  | configure running port of this client application  |
| package.json | config of dependencies |


## Functions
  + Job List
    + display a list of jobs with title, location and date in a table
      + jobs data are retrieved from MySQL database by sending HTTP requests (GET) 
      + date formatting is set to YYYY-MM-DD after retrieving from database, where the date field is stored as YYYY-MM-DD HH:MM:SS by default
    + while waiting retrieving data from database, a loading spinner is displayed for better user experience
    + how many jobs displayed per page can be selected from [3, 6, 9] and pagination is available for better user experience
      + pagination style uses Material-UI
    + click on 'View' button to view more details about a job in a detail page
      + Job Detail page including title, description, location, date and the list of applicants.
      + can go back to job list page by clicking the top navigation tab 'Job List'

## Run the application

To run this client application, open your terminal, and run the following command line:
```
# clone to local 
git clone https://github.com/daneez/job-board-react.git`

# enter into the file directory
`cd job-board-react`

# install the dependencies
`npm install`

# start the application
`npm start`

# view it in the browser
visit [http://localhost:8081](http://localhost:8081) 

```
You will see the following screenshot once the application is started successfully:

![screenshot](https://github.com/daneez/job-board-react/blob/main/Screen%20Shot%202021-03-29%20at%201.32.49%20am.png)

![screenshot](https://github.com/daneez/job-board-react/blob/main/Screen%20Shot%202021-03-29%20at%2011.14.12%20pm.png)

## Run the test

`npm test`

Unit Test is implemented with React Testing Library. It hasn't been completely covered as only few tests was done due to a time limitation.
Complete testing coverage needs to be achieved in the near future.
