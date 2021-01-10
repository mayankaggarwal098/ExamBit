import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  Row,
  Col,
  Button,
  Container,
  Modal,
  ListGroup,
} from 'react-bootstrap';
import { getAllQuestions } from '../actions/questionAction';
import { deleteQuestion } from '../actions/questionAction';
import Loader from '../component/Loader';
import { paginate } from '../utils/paginate';
import Paginations from '../component/Pagination';

const QuestionList = ({ history }) => {
  const [show, setShow] = useState(false);
  const [pos, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { loading, questions } = useSelector(state => state.questionList);
  const { loading: loadingCreate } = useSelector(state => state.createQuestion);

  const { loading: loadingDelete } = useSelector(state => state.questionDelete);

  const totalCount = questions && questions.length;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!questions) {
      dispatch(getAllQuestions());
    }
  }, [dispatch, questions]);

  const createHandler = () => {
    history.push('/questions/create');
  };

  const deleteHandler = id => {
    if (window.confirm('Are you sure ')) {
      dispatch(deleteQuestion(questions, id));
    }
  };

  const set = index => {
    setShow(true);
    setIndex(index);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const ques = paginate(questions, currentPage, pageSize);

  return (
    <>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {loading && <Loader />}
      <Container>
        <Row className="align-items-center">
          <Col>
            <h3 style={{ color: 'black' }}>All Questions</h3>
          </Col>
          <Col className="text-right">
            <Button className="my-3" onClick={createHandler}>
              <i className="fas fa-plus"></i>&nbsp;&nbsp;Add New Question
            </Button>
          </Col>
        </Row>
        <Table hover bordered striped responsive className="table-lg">
          <thead>
            <tr>
              <th>SUBJECT</th>
              <th>QUESTION</th>
              <th>WEIGHTAGE</th>
              <th>&nbsp;&nbsp;ACTION&nbsp;&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {ques &&
              ques.map((question, index) => (
                <tr key={question._id}>
                  <td>{question.subject}</td>
                  <td>{question.questionBody}</td>
                  <td>{question.weightage}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="btn-sm"
                      onClick={() => set(index)}
                    >
                      <i className="fas fa-info-circle"></i>
                    </Button>
                    &nbsp;
                    <Button
                      variant="primary"
                      className="btn-sm"
                      onClick={() => deleteHandler(question._id)}
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
      {ques && ques[pos] && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="my-modal"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton style={{ textAlign: 'center' }}>
            <Modal.Title id="example-custom-modal-styling-title">
              Question
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>
                  <b>SUBJECT</b>
                </strong>{' '}
                : {ques[pos].subject}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <b>WEIGHTAGE</b>
                </strong>{' '}
                : {ques[pos].weightage}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <b>QUESTION</b>
                </strong>{' '}
                : {ques[pos].questionBody}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <b>OPTIONS</b>
                </strong>
                <br></br>
                {ques[pos].options.map((opt, index) => (
                  <>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <strong>{index + 1}</strong>: {opt.optionBody}
                    <br></br>
                  </>
                ))}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <b>Answer:</b>{' '}
                </strong>
                {ques[pos].options.map((opt, index) => (
                  <>
                    {opt.isAnswer && (
                      <>
                        <strong>Option{index + 1}</strong>: {opt.optionBody}
                        ,&nbsp;
                      </>
                    )}
                  </>
                ))}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <b>EXPLAINATION</b>
                </strong>{' '}
                : {ques[pos].explaination}
              </ListGroup.Item>
            </ListGroup>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default QuestionList;
