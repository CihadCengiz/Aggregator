import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Volunteer from "./Volunteer";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import useFetchVol from "./useFetchVol";
import CheckBox from "./CheckBox";
import Collapse from "react-bootstrap/Collapse";
import ClipLoader from "react-spinners/ClipLoader";

let checkedDegree = [];
let checkedDOP = [];
let checkedFOStd = [];
let checkedDuration = [];

export default function VolunteerOpp() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(0);
  const { volunteers, loading, error, hasNextPage, volunteerCount } =
    useFetchVol(params, page);

  function handleChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    setPage(0);
    if (param === "degree") {
      if (!checked) {
        const index = checkedDegree.indexOf(value);
        if (index > -1) {
          checkedDegree.splice(index, 1);
        }
        setParams((prevParams) => {
          return { ...prevParams, [param]: checkedDegree };
        });
      } else {
        checkedDegree.push(value);
        setParams((prevParams) => {
          return { ...prevParams, [param]: checkedDegree };
        });
      }
    } else if (param === "dopportunities") {
      if (!checked) {
        const index = checkedDOP.indexOf(value);
        if (index > -1) {
          checkedDOP.splice(index, 1);
        }
        setParams((prevParams) => {
          return { ...prevParams, [param]: checkedDOP };
        });
      } else {
        checkedDOP.push(value);
        setParams((prevParams) => {
          return { ...prevParams, [param]: checkedDOP };
        });
      }
    } else if (param === "fofstd") {
      if (!checked) {
        const index = checkedFOStd.indexOf(value);
        if (index > -1) {
          checkedFOStd.splice(index, 1);
        }
        setParams((prevParams) => {
          return { ...prevParams, [param]: checkedFOStd };
        });
      } else {
        checkedFOStd.push(value);
        setParams((prevParams) => {
          return { ...prevParams, [param]: checkedFOStd };
        });
      }
    } else if (param === "duration") {
      if (!checked) {
        const index = checkedDuration.indexOf(value);
        if (index > -1) {
          checkedDuration.splice(index, 1);
        }
        setParams((prevParams) => {
          return { ...prevParams, [param]: checkedDuration };
        });
      } else {
        checkedDuration.push(value);
        setParams((prevParams) => {
          return { ...prevParams, [param]: checkedDuration };
        });
      }
    }
  }

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(0);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  function ShowSearch() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          Show Advanced Search Settings
        </Button>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <CheckBox onParamChange={handleChange} />
          </div>
        </Collapse>
      </>
    );
  }

  return (
    <Container fluid className="my-4">
      <Row>
        <Col className="d-block d-sm-none text-center pb-3">
          <ShowSearch />
        </Col>
        <Col xs={12} sm={4} md={3} lg={3} className="d-none d-sm-block">
          <CheckBox />
        </Col>
        <Col xs={12} sm={8} md={9} lg={9}>
          <h4 className="text-muted font-weight-light">
            Found {volunteerCount} volunteer offers!
          </h4>
          <SearchForm params={params} onParamChange={handleParamChange} />
          <JobsPagination
            page={page + 1}
            setPage={setPage}
            hasNextPage={hasNextPage}
          />
          <div className="d-flex justify-content-center">
            {loading && (
              <ClipLoader color={"#36D7B7"} loading={loading} size={100} />
            )}
            {error && <h1>Error...</h1>}
          </div>
          {volunteers.map((volunteer) => {
            return <Volunteer key={volunteer.id} volunteer={volunteer} />;
          })}
          <JobsPagination
            page={page + 1}
            setPage={setPage}
            hasNextPage={hasNextPage}
          />
        </Col>
      </Row>
    </Container>
  );
}
