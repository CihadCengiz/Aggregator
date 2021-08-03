import React from "react";
import { Card } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

export default function Job({ job }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="mb-3 text-primary">
            {job.title}
        </Card.Title>
        
        <div className="d-flex">
          <a href={job.redirect} >
            <img src={job.logo} className="d-none d-md-block mb-2 border rounded"
              width="100px"
              height="100px"
              alt={job.company}>
            </img>
          </a>
          <div>
            <Card.Title className="ms-2">
              <p className="text-muted font-weight-light">{job.fofstd}</p>
              <h6 className="text-primary">
                {job.company}{" "}
                <Badge bg="secondary" className="ms-5">
                  {job.location}
                </Badge>
              </h6>
            </Card.Title>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <Card.Subtitle className="text-muted mt-3">
            <b>Duration:</b> {job.duration}
          </Card.Subtitle>
          <Card.Subtitle className="text-muted mt-3">
            <b>Post Date:</b> {new Date(job.postdate).toLocaleDateString()}
          </Card.Subtitle>
          <Card.Subtitle className="text-muted mt-3">
            <b>Deadline:</b> {new Date(job.deadline).toLocaleDateString()}
          </Card.Subtitle>
          <Button variant="primary" size="lg" href={job.redirect}>
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
