import React from 'react';
import { Table, Row, Col, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  removeSupervisor,
  supervisorReqList,
} from '../actions/supervisorAction';
import { updateSupervisor } from './../actions/supervisorAction';

const SupervisorTable = ({ supervisors, permission }) => {
  const dispatch = useDispatch();
  const deleteHandler = id => {
    if (window.confirm('Are you sure')) {
      dispatch(removeSupervisor(supervisors, id, permission));
    }
  };

  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col>
            <h3 style={{ color: 'black' }}>Supervisor List</h3>
          </Col>
          {!permission && (
            <Col className="text-right">
              <Button
                className="my-3"
                onClick={() => dispatch(supervisorReqList())}
              >
                <i className="fas fa-sync"></i>&nbsp;&nbsp;Reload
              </Button>
            </Col>
          )}
        </Row>
        <Table hover bordered striped responsive className="table-centered">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PERMISSION</th>
              <th>&nbsp;&nbsp;REMOVE&nbsp;&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {supervisors &&
              supervisors.map((supervisor, index) => (
                <tr key={supervisor._id} style={{ textAlign: 'center' }}>
                  <td>{supervisor.name}</td>
                  <td>{supervisor.email}</td>
                  <td>
                    {permission && (
                      <Button
                        variant="outline-primary"
                        className="btn btn-block"
                        onClick={() =>
                          dispatch(updateSupervisor(supervisor, false))
                        }
                      >
                        Revoke
                      </Button>
                    )}
                    {!permission && (
                      <Button
                        variant="outline-primary"
                        className="btn btn-block"
                        onClick={() =>
                          dispatch(updateSupervisor(supervisor, true))
                        }
                      >
                        Grant
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className="btn-sm"
                      onClick={() => deleteHandler(supervisor._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default SupervisorTable;
