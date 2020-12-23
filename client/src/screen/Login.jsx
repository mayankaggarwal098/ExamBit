import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

const Login = () => {

    const submitHandler = () => {

    }

    return (
        <Container>
            <Row className="justify-content-md-center my-5">
                <Col sx={12} md={6}>
                <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email Address"
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Login
                </Button>

                <Row className="py-3 px-3">
                        NEW USER ? &nbsp;&nbsp; <Link to='/register'>REGISTER</Link>
                        
                </Row> 
                </Form>
                </Col>
            </Row>
            
        </Container>
    )
}

export default Login
