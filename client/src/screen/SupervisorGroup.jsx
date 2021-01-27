import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { createGroup, getAllGroup } from '../actions/groupAction';
import Group from '../component/Group';
import Loader from '../utils/Loader';

const SupervisorGroup = () => {
  const [show, setShow] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loader, setLoader] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');

  useEffect(() => {
    getTeam();
  }, []);

  const getTeam = async () => {
    setLoader(true);
    const { group } = await getAllGroup();
    setGroups(group);
    setLoader(false);
  };

  const createHandler = async () => {
    try {
      setLoader(true);
      const group = await createGroup(groupName, groupCode);
      setGroupName('');
      setGroupCode('');
      setLoader(false);
      const arr = [...groups, group];
      setGroups(arr);
    } catch (ex) {}

    setShow(false);
  };

  return (
    <Container className="my-3">
      {loader && <Loader />}
      <Row>
        <Col>
          <h3 style={{ color: 'black' }}>GROUPS</h3>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button variant="outline-primary" onClick={() => setShow(true)}>
            <i className="fas fa-plus"></i> <i className="fa fa-users"></i> New
            Group
          </Button>
        </Col>
      </Row>
      <Row>
        {groups &&
          groups.map(group => (
            <Col key={group._id} sm={12} md={6} lg={4} xl={3}>
              <Group group={group} />
            </Col>
          ))}
      </Row>
      {show && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Create Group
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="groupName">
                <Form.Label>Group Name</Form.Label>
                <Form.Control
                  required
                  placeholder="Group Name"
                  type="text"
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="groupCode">
                <Form.Label>Group Code</Form.Label>
                <Form.Control
                  required
                  placeholder="Group Code"
                  type="text"
                  value={groupCode}
                  aria-describedby="code"
                  onChange={e => setGroupCode(e.target.value)}
                />
                <Form.Text id="code" muted>
                  code length must be greater than 5
                </Form.Text>
              </Form.Group>

              <Button
                className="btn-block"
                variant="outline-primary"
                onClick={() => createHandler()}
              >
                Create
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="outline-primary" onClick={() => setShow(false)}>
              Close
            </Button> */}
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default SupervisorGroup;
