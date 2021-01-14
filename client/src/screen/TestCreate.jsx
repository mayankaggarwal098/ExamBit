import React, { useState, useEffect } from 'react';
import { Form, Container, Button, Row, Col, Modal, ListGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';
import { getAllQuestions } from '../actions/questionAction';
import { createTest } from '../actions/testAction';

import 'react-datepicker/dist/react-datepicker.css';

const TestCreate = ({ history }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isSnapshots, setSnapshots] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const { questions } = useSelector(state => state.questionList);

  const { testPapers } = useSelector(state => state.getTestPaper);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!questions) {
      dispatch(getAllQuestions());
    }
  }, []);

  const submitQuestionHandler = e => {
    let arr = [...selectedQuestions];

    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      arr = arr.filter(a => a !== e.target.value);
    }

    setSelectedQuestions(arr);
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log(startTime);
    dispatch(
      createTest({
        title,
        subject,
        duration,
        selectedQuestions,
        isSnapshots,
        startTime,
      })
    );
    history.push('/tests/notConducted');
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
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} md={4} controlId="subject">
              <Form.Label>
                <i className="fas fa-book"></i> Subject
              </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md={2} controlId="duration">
              <Form.Label>
                <i className="fa fa-clock-o"></i> Duration
              </Form.Label>
              <Form.Control
                required
                type="number"
                min="0"
                placeholder="Select.."
                value={duration}
                aria-describedby="durationInMinute"
                onChange={e => setDuration(e.target.value)}
              />
              <Form.Text id="durationInMinute" muted>
                Duration must be filled in term of minutes
              </Form.Text>
            </Form.Group>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Form.Group>
              <Form.Label>
                <i className="fa fa-calendar"></i> Test Date
              </Form.Label>
              <br />
              <DatePicker
                selected={startTime}
                onChange={date => setStartTime(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
              />
            </Form.Group>
          </Form.Row>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Enable WebCam"
            checked={isSnapshots}
            onChange={() => setSnapshots(!isSnapshots)}
          />
          <br />
          <Button variant="outline-primary" className="btn btn-block" onClick={() => setShow(true)}>
            Select Question
          </Button>
          <br />
          <br />
          <Button
            variant="outline-primary"
            type="submit"
            disabled={selectedQuestions.length ? false : true}
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
                          selectedQuestions.filter(ques => ques === question._id).length
                            ? true
                            : false
                        }
                        onChange={e => submitQuestionHandler(e)}
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
