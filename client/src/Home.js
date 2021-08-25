import React, {useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Job from "./Job";
import Volunteer from "./Volunteer";
import useFetchJobs from "./useFetchJobs";
import useFetchVol from "./useFetchVol";
import {Link} from 'react-router-dom';

export default function Home() {
  const [params] = useState({});
  const page = 0;
  const size = 5;
  const [location] = useState([])
  const { jobs, loading, error } = useFetchJobs(params, page, size, location );
  const { volunteers } = useFetchVol(params, page, size, location );


  return (
    <Container className="my-4">
      <Row>
        <div className="d-flex justify-content-center">
          {loading && <h1>Loading...</h1>}
          {error && <h1>Error...</h1>}
        </div>
        <Col>
      <h4 className="text-muted font-weight-light">
        Internship offers
      </h4>
          {jobs.map((job) => {
            return <Job key={job.id} job={job} />;
          })}
          <Link to='/internships'>View More</Link>
        </Col>
        <Col>
        <h4 className="text-muted font-weight-light">
        Volunteer Opportunities
      </h4>
        {volunteers.map((volunteer) => {
            return <Volunteer key={volunteer.id} volunteer={volunteer} />;
          })}
        </Col>
      </Row>
    </Container>
  );
}
