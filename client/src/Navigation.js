import React from "react";
import { Navbar, Nav } from "react-bootstrap";
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
      className="d-flex justify-content-between"
    >
      <Navbar.Brand className="d-flex align-items-center ps-3">
        <img
          height="100px"
          width="100px"
          alt="logo"
          src={logo}
        />

        <Nav.Link as={Link} eventKey="0" style={navStyle} to="/">
          Find Internships
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Brand>
        <Navbar.Toggle className=" ms-3 flex-md-row-reverse flex-sm-row align-items-center" style={{marginLeft: 0}} />
        <Navbar.Collapse className="ms-3">
          <Nav>
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
        </Navbar.Brand>
    </Navbar>
  );
}

export default Navigation;
