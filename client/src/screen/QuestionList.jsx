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

const QuestionList = ({ history }) => {
  const [show, setShow] = useState(false);
  const [pos, setIndex] = useState(0);

  const { loading, questions } = useSelector(state => state.questionList);
  const { loading: loadingCreate } = useSelector(state => state.createQuestion);

  const { loading: loadingDelete } = useSelector(state => state.questionDelete);

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
            {questions &&
              questions.map((question, index) => (
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
      </Container>
      {questions && questions[pos] && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="my-modal"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              QuestionID: {questions[pos]._id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>
                  <b>SUBJECT</b>
                </strong>{' '}
                : {questions[pos].subject}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <b>WEIGHTAGE</b>
                </strong>{' '}
                : {questions[pos].weightage}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <b>QUESTION</b>
                </strong>{' '}
                : {questions[pos].questionBody}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>
                  <b>OPTIONS</b>
                </strong>
                <br></br>
                {questions[pos].options.map((opt, index) => (
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
                {questions[pos].options.map((opt, index) => (
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
                  <b>EXPLANATION</b>
                </strong>{' '}
                : {questions[pos].explanation}
              </ListGroup.Item>
            </ListGroup>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default QuestionList;
