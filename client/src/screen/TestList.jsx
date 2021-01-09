import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  Row,
  Col,
  Button,
  Container,
  Modal,
  Tab,
  Tabs,
} from 'react-bootstrap';
import {
  getTestPaperList,
  testBegin,
  testPaperDelete,
} from '../actions/testAction';
import Loader from '../component/Loader';
import QuestionPaper from '../component/QuestionPaper';
import QuestionDetails from '../component/QuestionDetails';
import { openRegistrationforTest } from '../actions/studentRegistrationAction';
import { paginate } from '../utils/paginate';
import Paginations from '../component/Pagination';

const TestList = ({ history }) => {
  const [show, setShow] = useState(false);
  const [pos, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const { loading, error, testPapers } = useSelector(
    state => state.getTestPaper
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!testPapers) {
      dispatch(getTestPaperList());
    }
  }, []);

  //PAGINATION
  const totalCount = testPapers && testPapers.length;

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const testPaperSheet = paginate(testPapers, currentPage, pageSize);

  const set = index => {
    setShow(true);
    setIndex(index);
  };

  const createHandler = () => {
    history.push('/tests/create');
  };

  const deleteHandler = id => {
    if (window.confirm('Are you sure')) {
      dispatch(testPaperDelete(testPapers, id));
    }
  };

  const startTestHandler = (id, index) => {
    dispatch(testBegin(id, index, testPapers));
  };

  const handleClick = (id, status) => {
    status = status ? false : true;
    dispatch(openRegistrationforTest({ testPapers, id, status }));
  };
  return (
    <>
      {loading && <Loader />}
      <Container>
        <Row className="align-items-center">
          <Col>
            <h3 style={{ color: 'black' }}>All Tests</h3>
          </Col>
          <Col className="text-right">
            <Button className="my-3" onClick={createHandler}>
              <i className="fas fa-plus"></i>&nbsp;&nbsp;Create New Test
            </Button>
          </Col>
        </Row>
        <Table
          hover
          bordered
          striped
          responsive
          style={{ textAlign: 'center' }}
        >
          <thead>
            <tr>
              <th>SUBJECT</th>
              <th>TITLE</th>
              <th>DURATION(in minute)</th>
              <th>REGISTRATION</th>
              <th></th>
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
                  <td>
                    <Button
                      variant="outline-primary"
                      className="btn btn-block"
                      onClick={() =>
                        handleClick(test._id, test.isRegistrationAvailable)
                      }
                    >
                      {test.isRegistrationAvailable ? 'Close' : 'Open'}
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className="btn btn-block"
                      disabled={test.isTestBegins}
                      onClick={() => startTestHandler(test._id, index)}
                    >
                      Start Test
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className="btn-sm"
                      onClick={() => set(index)}
                    >
                      <i className="fas fa-info-circle"></i>
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
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
          itemsCount={totalCount}
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
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              TestID: {testPaperSheet[pos]._id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey="details" id="uncontrolled-tab-example">
              <Tab
                eventKey="details"
                title={<i className="fas fa-info-circle"> Details</i>}
              >
                <QuestionDetails testPaperSheet={testPaperSheet} pos={pos} />
              </Tab>
              <Tab
                eventKey="questions"
                title={<i className="fas fa-question-circle"> Question</i>}
              >
                <QuestionPaper testPaperSheet={testPaperSheet} pos={pos} />
              </Tab>
              <Tab
                eventKey="trainee"
                title={<i className="fas fa-user"> Trainees</i>}
              >
                rawat
              </Tab>
              <Tab
                eventKey="statistics"
                title={<i className="fas fa-chart-bar"> Statistics</i>}
              >
                rawat
              </Tab>
              <Tab
                eventKey="feedback"
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

export default TestList;
