import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const StudentRegistered = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const submitHandler = e => {};

  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col sx={12} md={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>
                <i className="fas fa-envelope"></i> Email address
              </Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>
                <i class="fas fa-key"></i> Password
              </Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="phonenumber">
              <Form.Label>
                <i class="fas fa-phone"></i> Mobile Number
              </Form.Label>
              <Form.Control
                required
                placeholder="Password"
                value={number}
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
