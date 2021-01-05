import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const QuestionDetails = ({ testPapers, pos }) => {
  var link = window.location.href.split('/').splice(0, 3);
  var mainlink = '';
  link.forEach(d => {
    mainlink = mainlink + d + '/';
  });

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
          <Col xs={5} xl={5}>
            <Link>{`${mainlink}student/registration/test/${testPapers[pos]._id}`}</Link>
          </Col>
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
