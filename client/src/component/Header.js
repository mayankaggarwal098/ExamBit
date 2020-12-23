import React from 'react'
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Link to="/">
                    <Navbar.Brand>Home</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                </Nav>
                <Nav>
                    <Link to="/login">
                        <Nav.Link>Login</Nav.Link>
                    </Link>
                    <NavDropdown title="SIGNIN">
                        <Link to="/register/teacher">
                            <NavDropdown.Item>TEACHER</NavDropdown.Item>
                        </Link>

                        <Link to="/register/stduent">
                            <NavDropdown.Item>STUDENT</NavDropdown.Item>
                        </Link>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}

export default Header
