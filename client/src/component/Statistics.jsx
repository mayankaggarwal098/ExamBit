import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, ListGroup, Button, Col, Row } from 'react-bootstrap';
import { downloadResult } from '../actions/studentRegistrationAction';
import BarCharts from '../utils/BarCharts';
import PieChart from '../utils/PieChart';

const Statistics = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col md={2}>
              <Button
                className="btn btn-block"
                variant="outline-danger"
                onClick={() => downloadResult(id)}
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
          <p>Score vs No of Student</p>
          <BarCharts />
        </ListGroup.Item>
        <ListGroup.Item>
          <Row style={{ position: 'center' }}>
            <Col md={5}>
              <p>Pass/Fail</p>
              <PieChart />
            </Col>
            <Col md={5}>
              <p>Category</p>
              <PieChart />
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default Statistics;
