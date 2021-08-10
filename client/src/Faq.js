import React from 'react'
import { Container, Row } from 'react-bootstrap';
import bg from "./bg.svg"
import styled from "styled-components";

const StyledImg = styled.img`
  width: 90%;
`;


export default function Faq() {
    return (
        <Container>
            <Row className="pb-5 justify-content-center">
                <h1 className="d-flex justify-content-center mt-5 pt-5">
                    Get to know us
                </h1>
                <h2 className="justify-content-center mt-4 text-muted font-weight-light text-center">
                    Browse through internship opportunities and find your match.
                </h2>
                {/* <img src={bg} alt="team meeting illustration" className="mt-5 mb-5"/> */}
                <StyledImg src={bg} alt="team meeting illustration" className="mt-5 mb-5"/>
            </Row>
            <Row>
                <h2 className="d-flex justify-content-center">
                    Frequently Asked Questions
                </h2>
            </Row>
        </Container>
    )
}
