import React, { useState, useEffect } from 'react';
import { Button, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { responseSheetOfStudent } from '../actions/responseSheetAction';
import { getSinglePaper } from '../actions/testAction';
import Pagination from '../component/Pagination';

const TestPaper = () => {
  const query = new URLSearchParams(useLocation().search);
  const testId = query.get('testid');
  const studentId = query.get('studentid');

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

  const totalCount = paper && paper.length;

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
    setSaveAnswer([...answer]);
    console.log(answer);
    resetAnswerHandler();
  };

  return (
    <div>
      {paper && (
        <Container>
          <Row className="justify-content-md-left my-5 pd-5">
            <ListGroup>
              <ListGroup.Item>
                <strong>QUESTION:1</strong>{' '}
                {paper[currentPage - 1].questionBody}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Options:</strong>
                <br />
                {paper[currentPage - 1].options.map(opt => (
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
                ))}
              </ListGroup.Item>
            </ListGroup>

            <br />
            <br />
          </Row>
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </Button>{' '}
          <Button
            onClick={() => resetAnswerHandler()}
            disabled={currentPage === totalCount}
          >
            Next
          </Button>{' '}
          <Button
            onClick={() => submitHandler()}
            disabled={currentPage === totalCount}
          >
            Save & Next
          </Button>
          <Row className="justify-content-md-bottom my-5 pd-5">
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </Row>
        </Container>
      )}
    </div>
  );
};

export default TestPaper;
