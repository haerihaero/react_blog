import React from "react";
import { Col, Row } from "reactstrap";

const Header = () => {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1>Read Our Blog</h1>
          <p>대진의 싸플블로그 따라하기</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
