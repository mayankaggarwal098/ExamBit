import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userAction";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const logOutHandler = () => {
    dispatch(logout());
  };

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
              {userInfo &&
                (userInfo.category === "SUPERVISOR" ? (
                  <>
                    <LinkContainer to="/questions">
                      <Nav.Link>
                        <i className="fas fa-list" />
                        &nbsp;All Questions
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/tests">
                      <Nav.Link>
                        <i className="fas fa-list" />
                        &nbsp;All Test
                      </Nav.Link>
                    </LinkContainer>
                  </>
                ) : (
                  <>
                    <Nav.Link>
                      <i className="fas fa-list" />
                      &nbsp;All Test
                    </Nav.Link>
                    <Nav.Link>Pricing</Nav.Link>
                  </>
                ))}
            </Nav>
            <Nav>
              {userInfo ? (
                <NavDropdown title={userInfo.name.toUpperCase()} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="fas fa-user" />
                      &nbsp;PROFILE
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/login">
                    <NavDropdown.Item onClick={logOutHandler}>
                      <i className="fas fa-sign-out-alt" />
                      &nbsp;LOGOUT
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-sign-in-alt" />
                      &nbsp;Login
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fas fa-user-plus" />
                      &nbsp;Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
