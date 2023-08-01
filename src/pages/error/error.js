import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../error/error.scss";

const Error = () => {
  return (
    <>
      <section className="error-page-wrap h-100vh">
        <Container className="h-100vh">
          <Row className="justify-content-center align-items-center h-100vh">
            <Col lg="9" className="mx-auto">
              <div className="error-inner text-center py-5 d-flex justify-content-center align-items-center flex-column">
                <h3 className="text-white display-1 fw-bold">404</h3>
                <h4 className="text-white fs-2">Page not found</h4>
                <h6 className="text-white fs-6">
                  It appears the page you were looking for couldn’t be found.
                </h6>
                <div className="mt-4">
                  <Link
                    to="/"
                    className="btn btn-lightGreen text-decoration-none px-5 py-2"
                  >
                    Go back to home
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Error