import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Register = () => {
    const submitHandler = () => {

    }

    return (
        <Container>
            <Row className="justify-content-md-center my-5">
                <Col sx={12} md={6}>
                <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter name"
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email Address"
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        >
                            <option>Supervisor</option>
                            <option>Student</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="confirmPassword"
                        placeholder="Confirm Password"
                    ></Form.Control>
                </Form.Group>

                <Button type="submit">
                    Submit
                </Button>

                <Row className="py-3 px-3">
                        ALREADY HAVE AN ACCOUNT ? &nbsp;&nbsp; <Link to='/login'>SIGN IN</Link>
                        
                </Row> 
            </Form>

            </Col>
            </Row>
        </Container>
    )
}

export default Register
