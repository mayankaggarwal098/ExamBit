import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userAction';

const Header = () => {
  const dispatch = useDispatch();
  const { path } = useSelector(state => state.urlPath);

  const { userInfo } = useSelector(state => state.userLogin);

  const logOutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      {path !== '/student/test/start' && (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Home</Navbar.Brand>
            </LinkContainer>
            {userInfo && (
              <>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    {userInfo && userInfo.category === 'SUPERVISOR' && (
                      <>
                        <LinkContainer to="/questions">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;All Questions
                          </Nav.Link>
                        </LinkContainer>

                        <NavDropdown title="All Test" id="test">
                          <LinkContainer to="/tests/notConducted">
                            <NavDropdown.Item>
                              <i className="fas fa-paper-plane"></i>
                              &nbsp;Test Not Conducted
                            </NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to="/tests/conducted">
                            <NavDropdown.Item>
                              <i className="fas fa-paper-plane"></i>
                              &nbsp;Test Conducted
                            </NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                        <NavDropdown title="All Assignment" id="assignment">
                          <LinkContainer to="/assignment/notConducted">
                            <NavDropdown.Item>
                              <i className="fas fa-paper-plane"></i>
                              &nbsp;Assignment Not Conducted
                            </NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to="/assignment/conducted">
                            <NavDropdown.Item>
                              <i className="fas fa-paper-plane"></i>
                              &nbsp;Assignment Conducted
                            </NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                        <LinkContainer to="/supervisor/groups">
                          <Nav.Link>
                            <i className="fa fa-users"></i>
                            &nbsp;Groups
                          </Nav.Link>
                        </LinkContainer>
                      </>
                    )}
                    {userInfo && userInfo.category === 'ADMIN' && (
                      <>
                        <LinkContainer to="/supervisor">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;SUPERVISOR
                          </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/supervisor/request">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;REQUEST
                          </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/supervisor/delete">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;Delete Media
                          </Nav.Link>
                        </LinkContainer>
                      </>
                    )}
                    {userInfo && userInfo.category === 'STUDENT' && (
                      <>
                        <LinkContainer to="/pastTest">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;PAST TEST
                          </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/upcomingTest">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;UPCOMING TEST
                          </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/past-assignment">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;PAST ASSIGNMENT
                          </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/upcoming-assignment">
                          <Nav.Link>
                            <i className="fas fa-list" />
                            &nbsp;ASSIGNED ASSIGNMENT
                          </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/student/groups">
                          <Nav.Link>
                            <i className="fa fa-users"></i>
                            &nbsp;Groups
                          </Nav.Link>
                        </LinkContainer>
                      </>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </>
            )}
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
          </Container>
        </Navbar>
      )}
    </header>
  );
};

export default Header;
