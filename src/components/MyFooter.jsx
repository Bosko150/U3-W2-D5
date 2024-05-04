import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const MyFooter = () => {
  return (
    <footer className="footer mt-4 text-transwhite footer-bg pt-3">
      <Container>
        <Row>
          <Col sm={9}>
            <h5 className="fw-bold text-white">Forecast360</h5>
            <p>Get accurate weather updates instantly with our app.</p>
          </Col>
          <Col sm={3}>
            <h5 className="text-white">Links</h5>
            <ul className="list-unstyled ">
              <li>
                <a className="text-decoration-none text-transwhite" href="#0">
                  Home
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-transwhite" href="#0">
                  About
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-transwhite" href="#0">
                  Contact
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="m-1" />
        <p className="text-center m-0 my-3">© {new Date().getFullYear()} Forecast360. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default MyFooter;
