import React from "react";
import { Button, Container } from "react-bootstrap";
import { deleteMedia } from "./../actions/supervisorAction";

export default function DeleteMedia() {
  const deleteHandler = async () => {
    await deleteMedia();
  };
  return (
    <Container style={{ margin: "5px" }}>
      Snapshots and Audio Recordings before one month will be deleted
      <br />
      <Button variant="outline-danger" onClick={deleteHandler}>
        Delete
      </Button>
    </Container>
  );
}
