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
      className="d-flex justify-content-between px-5"
      expand='lg'
      collapseOnSelect 
    >
      <Navbar.Brand className="d-flex align-items-center px-5">
        <img
          height="100px"
          width="100px"
          alt="logo"
          src={logo}
        />

        <Nav.Link as={Link} eventKey="0" style={navStyle} to="/">
          Find Internships
        <Navbar.Toggle className="me-5" style={{marginLeft: 0}} />
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Brand className="">
        <Navbar.Collapse className="me-4">
          <Nav>
            <Nav.Link as={Link} eventKey="1" style={navStyle} to="/internships">
              <Nav>Internships</Nav>
            </Nav.Link>
            <Nav.Link as={Link} eventKey="2" style={navStyle} to="/about">
              <Nav>About</Nav>
            </Nav.Link>
            <Nav.Link as={Link} eventKey="3" style={navStyle} to="/contact">
              <Nav>Contact us</Nav>
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
        </Navbar.Brand>
    </Navbar>
  );
}

export default Navigation;
