import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, ListGroup, Button, Col, Row } from 'react-bootstrap';
import { downloadResult } from '../actions/studentRegistrationAction';

const Statistics = ({ id }) => {
  console.log(id);
  const dispatch = useDispatch();
  return (
    <Container>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col md={2}>
              <Button
                className="btn btn-block"
                variant="outline-danger"
                onClick={() => dispatch(downloadResult(id))}
              >
                Download
              </Button>
            </Col>
            <Col md={10}>
              <p style={{ fontSize: '20px' }}>
                Dowload the test result excel sheet
              </p>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <p>sdfshhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default Statistics;
