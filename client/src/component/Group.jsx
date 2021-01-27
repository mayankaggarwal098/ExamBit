import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Group = ({ group }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Header variant="dark" style={{ color: 'black' }}>
        <Card.Title as="div">
          <strong>{group.groupName}</strong>
        </Card.Title>
      </Card.Header>
      <Card.Body></Card.Body>
      <Card.Footer>
        <Button variant="outline-primary" className="btn-block">
          Enter
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Group;
