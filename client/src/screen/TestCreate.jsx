import React, { useState, useEffect } from "react";
import {
  Form,
  Container,
  Button,
  Row,
  Col,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllQuestions } from "../actions/questionAction";
import { createTest } from "../actions/testAction";

const TestCreate = ({ history }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [selectQuestion, setSelectQuestion] = useState([]);
  const [isSnapshots, setSnapshots] = useState(false);
  const { questions } = useSelector((state) => state.questionList);

  const { testPapers } = useSelector((state) => state.getTestPaper);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!questions) {
      dispatch(getAllQuestions());
    }
  }, []);

  const submitQuestionHandler = (e) => {
    let arr = [...selectQuestion];

    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      arr = arr.filter((a) => a !== e.target.value);
    }

    setSelectQuestion(arr);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTest(testPapers, {
        title,
        subject,
        duration,
        selectQuestion,
        isSnapshots,
      })
    );
    history.push("/tests");
  };

  return (
    <>
      <Container className="my-5">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="title">
            <Form.Label>
              <i className="fas fa-pen"></i> Title
            </Form.Label>
            <Form.Control
              required
              placeholder="Title..."
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="subject">
              <Form.Label>
                <i className="fas fa-book"></i> Subject
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="duration">
              <Form.Label>
                <i className="fas fa-clock"></i> Duration
              </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Select.."
                value={duration}
                aria-describedby="durationInMinute"
                onChange={(e) => setDuration(e.target.value)}
              />
              <Form.Text id="durationInMinute" muted>
                Duration must be filled in term of minutes
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Check this switch"
            checked={isSnapshots}
            onChange={() => setSnapshots(!isSnapshots)}
          />
          <Button variant="primary" onClick={() => setShow(true)}>
            Select Question
          </Button>
          <br />
          <br />
          <Button
            variant="primary"
            type="submit"
            disabled={selectQuestion.length ? false : true}
          >
            Submit
          </Button>
        </Form>
      </Container>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="my-modal"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <ListGroup>
            {questions &&
              questions.map((question, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={0.6}>
                      <strong>{index + 1}: </strong>
                    </Col>
                    <Col>
                      <Row>
                        <Col xs={2}>
                          <strong>Subject: </strong>
                        </Col>
                        <Col>{question.subject}</Col>
                      </Row>
                      <Row>
                        <Col xs={2}>
                          <strong>Weightage: </strong>
                        </Col>
                        <Col>{question.weightage}</Col>
                      </Row>
                      <Row>
                        <Col xs={2}>
                          <strong>Question: </strong>
                        </Col>
                        <Col>{question.questionBody}</Col>
                      </Row>
                      <Row>
                        <Col xs={2}>
                          <strong>Options: </strong>
                        </Col>
                        <Col>
                          {question.options.map((opt, index) => (
                            <React.Fragment key={index}>
                              <strong>{index + 1}: </strong>
                              {opt.optionBody}
                              <br />
                            </React.Fragment>
                          ))}
                        </Col>
                      </Row>
                      <Form.Check
                        type="checkbox"
                        value={question._id}
                        checked={
                          selectQuestion.filter((ques) => ques === question._id)
                            .length
                            ? true
                            : false
                        }
                        onChange={(e) => submitQuestionHandler(e)}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TestCreate;
