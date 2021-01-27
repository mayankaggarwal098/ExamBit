import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { studentsPrevPaper } from '../actions/studentRegistrationAction';
import Loader from '../utils/Loader';

const GivenTest = () => {
  const [prevPaper, setPrevPaper] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getPrevPaper();
  }, []);

  const getPrevPaper = async () => {
    setLoader(true);
    const paper = await studentsPrevPaper();
    setPrevPaper(paper);
    setLoader(false);
  };

  return (
    <Container>
      {loader && <Loader />}
      <Row className="align-items-center">
        <Col>
          <h3 style={{ color: 'black' }}>Previous Test</h3>
        </Col>
        <Col className="text-right">
          <Button
            variant="outline-primary"
            className="my-3"
            onClick={() => getPrevPaper()}
          >
            <i className="fas fa-sync"></i>&nbsp;&nbsp;Reload
          </Button>
        </Col>
      </Row>
      <Table hover bordered striped responsive style={{ textAlign: 'center' }}>
        <thead>
          <th>SNo.</th>
          <th>Title</th>
          <th>Subject</th>
          <th>No. of Ques</th>
          <th>Test Date</th>
          <th>Duration(MIN)</th>
          <th>Result</th>
        </thead>
        <tbody>
          {prevPaper &&
            prevPaper.map((p, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{p.testId.title}</td>
                <td>{p.testId.subject}</td>
                <td>{p.testId.questions.length}</td>
                <td>{p.testId.startTime.substring(0, 10)}</td>
                <td>{p.testId.duration}</td>
                <td>
                  <Button variant="outline-primary" className="btn-block">
                    Result
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GivenTest;
