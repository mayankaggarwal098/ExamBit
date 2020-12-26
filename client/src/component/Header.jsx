import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userAction'
const Header = () => {

    const dispatch = useDispatch();

    const { userInfo } = useSelector( state => state.userLogin )
  
    const logOutHandler = () => {
      dispatch(logout());
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Home</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                </Nav>
                <Nav>
                    { userInfo ? (
                        <NavDropdown title={userInfo.name.toUpperCase()} id="username">
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>PROFILE</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logOutHandler}>LOGOUT</NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                        <>
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                
                            <LinkContainer to="/register">
                                <Nav.Link>Sign Up</Nav.Link>
                            </LinkContainer>
                        </>
                    )}
                    
                </Nav>
                
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}

export default Header
