import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { getConductedTestPaper } from '../actions/testAction';
import TestTable from '../component/TestTable';
import Loader from '../utils/Loader';

const TestConductedList = () => {
  const { loading, error, notConductedTestPapers } = useSelector(state => state.getTestPaper);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!notConductedTestPapers) {
      dispatch(getConductedTestPaper());
    }
  }, []);
  return (
    <>
      {loading && <Loader />}
      <Container>
        <Row className="align-items-center">
          <Col>
            <h3 style={{ color: 'black' }}>All Tests</h3>
          </Col>
          <Col className="text-right">
            <Button className="my-3" variant="outline-primary">
              <i className="fas fa-sync"></i>&nbsp;&nbsp;Reload
            </Button>
          </Col>
        </Row>
        <TestTable testPapers={notConductedTestPapers} isShow={false} />
      </Container>
    </>
  );
};

export default TestConductedList;
