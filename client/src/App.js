import React from 'react';
import './App.css';
// import FetchData from './FetchData'
// import { Container, Row, Col } from 'react-bootstrap';
// import useFetchJobs from './useFetchJobs';
// import { useState } from 'react';
// import Job from './Job';
// import JobsPagination from './JobsPagination';
// import SearchForm from './SearchForm';
import Navigation from './Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Internships from './Internships';
import About from './About';
import Home from './Home';


function App() {
  // const [params, setParams] = useState({});
  // const [page, setPage] = useState(0)
  // const {jobs, loading, error, hasNextPage, jobCount} = useFetchJobs(params, page)

  // function handleParamChange(e) {
  //   const param = e.target.name
  //   const value = e.target.value
  //   setPage(0)
  //   setParams(prevParams => {
  //     return { ...prevParams, [param]: value}
  //   })
  // }

  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/internships" component={Internships} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
        {/* <h1 className="mb-4">Find Internships</h1> */}
    {/* <Container className="my-4">
        <h4 className="text-muted font-weight-light">Found {jobCount} internship offers!</h4>
        <SearchForm params={params} onParamChange={handleParamChange} />
        <JobsPagination page={page+1} setPage={setPage} hasNextPage={hasNextPage}/>
      <Row>
        <div className="d-flex justify-content-center">
          {loading && <h1>Loading...</h1>}
          {error && <h1>Error...</h1>}
        </div>
        <Col>
          {jobs.map(job => {
            return <Job key={job.id} job={job} />
          })}
        </Col>
        <Col>
          {jobs.map(job => {
            return <Job key={job.id} job={job} />
          })}
        </Col>
      </Row>
        <JobsPagination page={page+1} setPage={setPage} hasNextPage={hasNextPage}/>
    </Container> */}
    </div>
  );
}

export default App;
