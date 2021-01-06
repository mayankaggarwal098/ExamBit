import React, { useState, useEffect } from 'react';
import { Button, Container, Form, ListGroup, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  responseSheetOfStudent,
  addAnswerForGivenQuestion,
} from '../actions/responseSheetAction';
import { getSinglePaper } from '../actions/testAction';
import Clock from '../component/Clock';
import Paginations from '../component/Pagination';

const TestPaper = () => {
  const query = new URLSearchParams(useLocation().search);
  const testId = query.get('testId');
  const studentId = query.get('studentId');

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [answer, setAnswer] = useState([]);
  const [saveAnswer, setSaveAnswer] = useState([]);

  const { paper } = useSelector(state => state.singleTestPaper);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!paper) {
      dispatch(getSinglePaper(testId));
      dispatch(responseSheetOfStudent({ testId, studentId }));
    }
  }, []);

  const totalCount = paper && paper.questions.length;

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const submitOptionHandler = e => {
    let arr = [...answer];

    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      arr = arr.filter(a => a !== e.target.value);
    }

    setAnswer(arr);

    if (!e.target.checked) {
      let temp = [...saveAnswer];
      temp = temp.filter(t => t !== e.target.value);
      setSaveAnswer(temp);
    }
  };

  const resetAnswerHandler = () => {
    setAnswer([]);
    setCurrentPage(currentPage + 1);
  };
  const submitHandler = () => {
    const temp = [...answer];
    for (var i = 0; i < answer.length; i++) saveAnswer.push(answer[i]);
    setSaveAnswer(saveAnswer);
    dispatch(
      addAnswerForGivenQuestion({
        testId,
        studentId,
        chosenOption: answer,
        questionId: paper.questions[currentPage - 1]._id,
      })
    );
    resetAnswerHandler();
  };

  return (
    <>
      <Container style={{ marginLeft: '100px', marginTop: '80px' }}>
        <Row>
          <Col md={9}>
            {paper && (
              <Container>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>QUESTION: {currentPage}</h4>
                    <p style={{ fontSize: '20px' }}>
                      {paper.questions[currentPage - 1].questionBody}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h4 style={{ textAlign: 'left' }}>
                      <strong>Options:</strong>
                    </h4>

                    {paper.questions[currentPage - 1].options.map(opt => (
                      <p style={{ fontSize: '20px' }}>
                        <Form.Check
                          type="checkbox"
                          value={opt._id}
                          label={opt.optionBody}
                          checked={
                            saveAnswer.filter(ans => ans === opt._id).length
                              ? true
                              : answer.filter(a => a === opt._id).length
                              ? true
                              : false
                          }
                          onChange={e => submitOptionHandler(e)}
                        />
                      </p>
                    ))}
                  </ListGroup.Item>
                  <br />
                  <br />
                </ListGroup>
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </Button>{' '}
                <Button
                  variant="primary"
                  onClick={() => resetAnswerHandler()}
                  disabled={currentPage === totalCount}
                >
                  Next
                </Button>{' '}
                <Button
                  onClick={() => submitHandler()}
                  disabled={currentPage === totalCount || answer.length === 0}
                >
                  Save & Next
                </Button>
              </Container>
            )}
          </Col>

          <Col md={3}>
            <Row style={{ marginTop: '-100px' }}>
              {paper && <Clock totalTime={paper.duration * 60} />}
            </Row>

            <Button
              className="btn btn-second"
              style={{ marginLeft: '120px', marginTop: '10px' }}
            >
              End Test
            </Button>

            {/* <div
              style={{
                marginTop: '30px',
                marginLeft: '130px',
                marginBottom: '0px',
              }}
            > */}
            <Paginations
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            {/* </div> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TestPaper;
