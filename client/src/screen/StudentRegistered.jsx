import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { studentRegistrationForTest } from '../actions/studentRegistrationAction';

const StudentRegistered = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setNumber] = useState('');

  const { id: testId } = useParams();

  var mainlink = window.location.href.split('/').splice(0, 3);
  var link = '';
  mainlink.forEach(d => {
    link = link + d + '/';
  });

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      studentRegistrationForTest({ name, email, phoneNum, testId, link })
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col sx={12} md={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>
                <i className="fa fa-user"></i> Name
              </Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>
                <i className="fas fa-envelope"></i> Email Address
              </Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="phonenumber">
              <Form.Label>
                <i className="fas fa-phone"></i> Mobile Number
              </Form.Label>
              <Form.Control
                required
                placeholder="mobile no."
                value={phoneNum}
                minLength="10"
                maxLength="10"
                onChange={e => setNumber(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentRegistered;