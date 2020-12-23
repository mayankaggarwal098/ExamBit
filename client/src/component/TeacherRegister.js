import React from 'react'
import { Form } from 'react-bootstrap';

const TeacherRegister = () => {
    const submitHandler = () => {

    }
    
    return (
        <>
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
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="confirmPassword"
                    placeholder="Confirm Password"
                ></Form.Control>
            </Form.Group>
        </Form>
        </>
    )
}

export default TeacherRegister
