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
      className="d-flex justify-content-between px-5"
    >
      <Navbar.Brand className="px-5">
        <img
          height="100px"
          width="100px"
          alt="logo"
          src={logo}
          className="me-2"
        />
        <Link style={navStyle} to="/">
          Find Internships
        </Link>
      </Navbar.Brand>
      <Nav className="me-5">
        <Link style={navStyle} to="/internships">
          <Nav className="me-2">Internships</Nav>
        </Link>
        <Link style={navStyle} to="/about">
          <Nav className="me-2">About</Nav>
        </Link>
        <Link style={navStyle} to="/contact">
          <Nav>Contact us</Nav>
        </Link>
      </Nav>
    </Navbar>
  );
}

export default Navigation;
