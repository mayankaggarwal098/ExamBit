import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const QuestionDetails = ({ testPaperSheet, pos }) => {
  var link = window.location.href.split('/').splice(0, 3);
  var mainlink = '';
  link.forEach(d => {
    mainlink = mainlink + d + '/';
  });

  return (
    <ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>TEST ID </strong>
          </Col>
          <Col>{testPaperSheet[pos]._id}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>TEST Link </strong>
          </Col>
          <Col>
            <Link>{`${mainlink}student/registration/test/${testPaperSheet[pos]._id}`}</Link>
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>TEST NAME </strong>
          </Col>
          <Col>{testPaperSheet[pos].title}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>SUBJECT </strong>
          </Col>
          <Col>{testPaperSheet[pos].subject}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <strong>DURATION </strong>
          </Col>
          <Col>{testPaperSheet[pos].duration}</Col>
        </Row>
      </ListGroup.Item>
    </ListGroup.Item>
  );
};

export default QuestionDetails;
