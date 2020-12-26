import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { login } from "../actions/userAction";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, userInfo, error } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    //console.log(login(email, password));
    dispatch(login(email, password));
  };

  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col sx={12} md={6}>
          <h2>SIGN IN</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Login
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

export default Login;
