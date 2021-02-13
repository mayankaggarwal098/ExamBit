import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { studentTestPaperList } from '../actions/studentRegistrationAction';
import StudentTestTable from '../component/StudentGroupTestTable';
import Loader from '../utils/Loader';

const StudentUpcomingTest = () => {
  const { loading, notGivenPaper } = useSelector(
    state => state.studentTestList
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!notGivenPaper) dispatch(studentTestPaperList());
  }, []);

  return (
    <Container>
      {loading && <Loader />}
      <Row className="align-items-center">
        <Col>
          <h3 style={{ color: 'black' }}>Upcoming Test</h3>
        </Col>
        <Col className="text-right">
          <Button
            variant="outline-primary"
            className="my-3"
            onClick={() => dispatch(studentTestPaperList())}
          >
            <i className="fas fa-sync"></i>&nbsp;&nbsp;Reload
          </Button>
        </Col>
      </Row>
      <StudentTestTable isShow={true} all={true} testPapers={notGivenPaper} />
      {/* <Table hover bordered striped responsive style={{ textAlign: 'center' }}>
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
      </Table> */}
    </Container>
  );
};

export default StudentUpcomingTest;
