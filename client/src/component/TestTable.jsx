import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Button, Container, Modal, Tab, Tabs } from 'react-bootstrap';
import QuestionPaper from '../component/QuestionPaper';
import QuestionDetails from '../component/QuestionDetails';
import { testBegin, testEndByTeacher, testPaperDelete } from '../actions/testAction';
import { openRegistrationforTest } from '../actions/studentRegistrationAction';
import { paginate } from '../utils/paginate';
import Paginations from '../utils/Pagination';
import Statistics from '../component/Statistics';
import Trainees from '../component/Trainees';
import Timer from '../utils/Timer';

const TestTable = ({ testPapers, isShow }) => {
  const [show, setShow] = useState(false);
  const [pos, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const count = testPapers && testPapers.length;

  const dispatch = useDispatch();

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  let testPaperSheet = paginate(testPapers, currentPage, pageSize);

  const [totalCount, setTotalCount] = useState(count);

  const set = index => {
    setShow(true);
    setIndex(index);
  };

  const deleteHandler = id => {
    if (window.confirm('Are you sure')) {
      dispatch(testPaperDelete(testPapers, id, isShow));
      setTotalCount(totalCount => totalCount - 1);
      let currPage = Math.floor((totalCount - 1) / pageSize);
      setCurrentPage(currPage);
      testPaperSheet = paginate(testPapers, currentPage, pageSize);
    }
  };

  const handleClick = (id, status) => {
    status = status ? false : true;
    dispatch(openRegistrationforTest({ testPapers, id, status }));
  };

  const endTest = id => {
    dispatch(testEndByTeacher(testPaperSheet, id));
  };

  return (
    <>
      <Container>
        <Table hover bordered striped responsive style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th>SUBJECT</th>
              <th>TITLE</th>
              <th>DURATION(IN MIN)</th>
              {isShow && (
                <>
                  <th>REGISTRATION</th>
                  <th>START TEST</th>
                  <th>TIME LEFT</th>
                </>
              )}

              <th>CREATED AT</th>
              <th>&nbsp;&nbsp;ACTION&nbsp;&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {testPaperSheet &&
              testPaperSheet.map((test, index) => (
                <tr key={test._id} style={{ textAlign: 'center' }}>
                  <td>{test.subject}</td>
                  <td>{test.title}</td>
                  <td>{test.duration}</td>
                  {!test.isTestConducted && (
                    <>
                      <td>
                        <Button
                          variant="outline-primary"
                          className="btn btn-block"
                          disabled={test.isTestBegins}
                          onClick={() => handleClick(test._id, test.isRegistrationAvailable)}
                        >
                          {test.isRegistrationAvailable ? 'Close' : 'Open'}
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          className="btn btn-block"
                          disabled={test.isTestBegins}
                          onClick={() =>
                            dispatch(
                              testBegin(test._id, pageSize * (currentPage - 1) + index, testPapers)
                            )
                          }
                        >
                          Start Test
                        </Button>
                      </td>
                      <td>
                        {test.isTestBegins
                          ? !test.isTestConducted && (
                              <Timer
                                time={test.startTime}
                                duration={test.duration}
                                endTest={endTest}
                                testId={test._id}
                              />
                            )
                          : '00:00:00'}
                      </td>
                    </>
                  )}

                  <td>
                    {/* {test.isTestConducted ? (
                      <i className="fas fa-check" style={{ color: 'green' }}></i>
                    ) : (
                      <i className="fa fa-times" style={{ color: 'red' }}></i>
                    )} */}
                    {test.createdAt.substring(0, 10)}
                  </td>
                  <td>
                    <Button variant="outline-primary" className="btn-sm" onClick={() => set(index)}>
                      <i className="fas fa-info-circle"></i>
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      variant="outline-primary"
                      className="btn-sm"
                      onClick={() => deleteHandler(test._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Paginations
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Container>
      {testPaperSheet && testPaperSheet[pos] && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="my-modal"
          aria-labelledby="example-custom-modal-styling-title"
        >
          {/* <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              TestID: {testPaperSheet[pos]._id}
            </Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <Tabs defaultActiveKey="details">
              <Tab eventKey="details" title={<i className="fas fa-info-circle"> Details</i>}>
                <QuestionDetails testPaperSheet={testPaperSheet} pos={pos} />
              </Tab>
              <Tab eventKey="questions" title={<i className="fas fa-question-circle"> Question</i>}>
                <QuestionPaper testPaperSheet={testPaperSheet} pos={pos} />
              </Tab>
              <Tab
                eventKey="trainee"
                disabled={!testPaperSheet[pos].isTestConducted}
                title={<i className="fas fa-user"> Trainees</i>}
              >
                <Trainees id={testPaperSheet[pos]._id} />
              </Tab>
              <Tab
                eventKey="statistics"
                disabled={!testPaperSheet[pos].isTestConducted}
                title={<i className="fas fa-chart-bar"> Statistics</i>}
              >
                <Statistics id={testPaperSheet[pos]._id} />
              </Tab>
              <Tab
                eventKey="feedback"
                disabled={!testPaperSheet[pos].isTestConducted}
                title={<i className="fas fa-comments"> FeedBack</i>}
              >
                rawat
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default TestTable;
