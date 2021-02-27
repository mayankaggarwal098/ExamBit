import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { studentRegistrationForTest } from '../actions/studentRegistrationAction';
import { getSinglePaper } from '../actions/testAction';

const StudentRegistered = ({ history }) => {
  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [phoneNum, setNumber] = useState('');

  const { id: testId } = useParams();

  var mainlink = window.location.href.split('/').splice(0, 3);
  var link = '';
  mainlink.forEach(d => {
    link = link + d + '/';
  });

  // const { paper } = useSelector(state => state.singleTestPaper);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!paper) {
  //     dispatch(getSinglePaper(testId));
  //   }
  // }, [paper]);

  const submitHandler = async e => {
    e.preventDefault();
    // await studentRegistrationForTest(
    //   { name, email, phoneNum, testId, link },
    //   history
    // );
    // dispatch(getSinglePaper(testId));

    await studentRegistrationForTest(
      { email, password, testId, link },
      history
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col sx={12} md={6}>
          <Form onSubmit={submitHandler}>
            {/* <Form.Group controlId="name">
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
            </Form.Group> */}
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
            <Form.Group controlId="password">
              <Form.Label>
                <i className="fa fa-key"></i> Password
              </Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group controlId="phonenumber">
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
            </Form.Group> */}

            <Button type="submit" variant="outline-primary">
              Register
            </Button>

            <Row className="py-3 px-3">
              NEW USER ? &nbsp;&nbsp; <Link to="/register">REGISTER</Link>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentRegistered;
