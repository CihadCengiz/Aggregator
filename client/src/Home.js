import React, {useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Job from "./Job";
import useFetchJobs from "./useFetchJobs";
import {Link} from 'react-router-dom';
// import CheckBox from "./CheckBox";

export default function Home() {
  const [params] = useState({});
  const page = 0;
  const size = 5;
  const [location] = useState([])
  const { jobs, loading, error } = useFetchJobs(params, page, size, location );


  return (
    <Container className="my-4">
      <h4 className="text-muted font-weight-light">
        Internship offers
      </h4>
      <Row>
        <div className="d-flex justify-content-center">
          {loading && <h1>Loading...</h1>}
          {error && <h1>Error...</h1>}
        </div>
        <Col>
          {jobs.map((job) => {
            return <Job key={job.id} job={job} />;
          })}
          <Link to='/internships'>View More</Link>
        </Col>
        <Col>bs</Col>
      </Row>
    </Container>
  );
}
