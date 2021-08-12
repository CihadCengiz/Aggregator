import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "./logo.png";
import "./App.css";
import { Link } from "react-router-dom";

function Navigation() {
  const navStyle = {
    color: "white",
  };

  return (
    <Navbar
      bg="secondary"
      variant="dark"
      sticky="top"
      expand='lg'
      collapseOnSelect 
      className="d-flex justify-content-between navbar-custom"
    >
      <Container fluid>
      <Navbar.Brand className="d-flex align-items-center">
        <img
          height="40px"
          width="100px"
          alt="logo"
          src={logo}
        />

        <Nav.Link as={Link} eventKey="0" style={navStyle} to="/">
          Find Internships
        </Nav.Link>
      </Navbar.Brand>
        <Navbar.Toggle className="flex-md-row-reverse flex-sm-row align-items-center" />
        <Navbar.Collapse className="">
          <Nav className="ms-auto">
            <Nav.Link as={Link} eventKey="1" style={navStyle} to="/internships">
              <Nav>Internships</Nav>
            </Nav.Link>
            <Nav.Link as={Link} eventKey="2" style={navStyle} to="/Faq">
              <Nav>FAQ</Nav>
            </Nav.Link>
            <Nav.Link as={Link} eventKey="3" style={navStyle} to="/contact">
              <Nav>Contact us</Nav>
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default Navigation;
