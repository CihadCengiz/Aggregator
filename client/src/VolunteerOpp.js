import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Volunteer from "./Volunteer";
import JobsPagination from "./JobsPagination";
import useFetchVol from "./useFetchVol";


export default function VolunteerOpp() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(0);
  const { volunteers, loading, error, hasNextPage, volunteerCount } = useFetchVol(
    params,
    page
  );

  return (
    <div className="d-flex justify-content-center">
        <Container xs={12} sm={8} md={9} lg={9}>
          <div className="d-flex justify-content-center">
            {loading && <h1>Loading...</h1>}
            {error && <h1>Error...</h1>}
          </div>
          <h4 className="text-muted font-weight-light">
            Found {volunteerCount} internship offers!
          </h4>
          {volunteers.map((volunteer) => {
            return <Volunteer key={volunteer.id} volunteer={volunteer} />;
          })}
        </Container>
      </div>
  );
}
