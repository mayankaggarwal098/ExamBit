import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';

const QuestionDetails = ({ testPapers, pos }) => {
  return (
    <ListGroup.Item variant="flush">
      <ListGroup.Item>
        <Row>
          <Col xs={5}>
            <strong>TEST ID </strong>
          </Col>
          <Col xs={5}>{testPapers[pos]._id}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col xs={5}>
            <strong>TEST Link </strong>
          </Col>
          <Col xs={5}>{testPapers[pos]._id}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col xs={5}>
            <strong>TEST NAME </strong>
          </Col>
          <Col xs={5}>{testPapers[pos].title}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col xs={5}>
            <strong>SUBJECT </strong>
          </Col>
          <Col xs={5}>{testPapers[pos].subject}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col xs={5}>
            <strong>DURATION </strong>
          </Col>
          <Col xs={5}>{testPapers[pos].duration}</Col>
        </Row>
      </ListGroup.Item>
    </ListGroup.Item>
  );
};

export default QuestionDetails;
