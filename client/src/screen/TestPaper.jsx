import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Form, ListGroup, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import {
  responseSheetOfStudent,
  addAnswerForGivenQuestion,
} from "../actions/responseSheetAction";
import { getSinglePaper, testEnd } from "../actions/testAction";
import Clock from "../component/Clock";
import { uploadImage } from "./../actions/snapshots";

const TestPaper = ({ history }) => {
  const query = new URLSearchParams(useLocation().search);
  const testId = query.get("testId");
  const studentId = query.get("studentId");
  const webcamRef = useRef(null);
  const [answer, setAnswer] = useState([]);
  const [saveAnswer, setSaveAnswer] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);

  const { paper } = useSelector((state) => state.singleTestPaper);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!paper) {
      dispatch(getSinglePaper(testId));
      dispatch(responseSheetOfStudent({ testId, studentId }));
    }
  }, []);

  const totalCount = paper && paper.questions.length;
  const arr = [];
  for (var i = 0; i < totalCount; i++) arr.push(i + 1);

  const submitOptionHandler = (e) => {
    let arr = [...answer];

    if (e.target.checked) {
      arr.push(e.target.value);
    } else {
      arr = arr.filter((a) => a !== e.target.value);
    }

    setAnswer(arr);

    if (!e.target.checked) {
      let temp = [...saveAnswer];
      temp = temp.filter((t) => t !== e.target.value);
      setSaveAnswer(temp);
    }
  };

  const resetAnswerHandler = () => {
    setAnswer([]);
    if (questionNumber !== totalCount) setQuestionNumber(questionNumber + 1);
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
        questionId: paper.questions[questionNumber - 1]._id,
      })
    );
    resetAnswerHandler();
  };

  const testSubmitHandler = () => {
    dispatch(testEnd({ testId, studentId }));
    localStorage.removeItem("time");
    history.push(
      `/student/test/result?testId=${testId}&studentId=${studentId}`
    );
  };

  const videoConstraints = {
    width: 480,
    height: 480,
    facingMode: "user",
  };

  setInterval(async function () {
    const image = webcamRef.current.getScreenshot({ height: 480, width: 480 });
    await uploadImage(testId, studentId, image);
  }, 5000);
  return (
    <div style={{ marginLeft: "100px", marginTop: "80px", padding: "20px" }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        screenshotQuality={0.3}
        width={0}
      />
      <Row>
        <Col md={8}>
          {paper && (
            <Container>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>QUESTION: {questionNumber}</h4>
                  <p style={{ fontSize: "20px" }}>
                    {paper.questions[questionNumber - 1].questionBody}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4 style={{ textAlign: "left" }}>
                    <strong>Options:</strong>
                  </h4>

                  {paper.questions[questionNumber - 1].options.map((opt) => (
                    <p style={{ fontSize: "20px" }} key={opt._id}>
                      <Form.Check
                        type="checkbox"
                        value={opt._id}
                        label={opt.optionBody}
                        checked={
                          saveAnswer.filter((ans) => ans === opt._id).length
                            ? true
                            : answer.filter((a) => a === opt._id).length
                            ? true
                            : false
                        }
                        onChange={(e) => submitOptionHandler(e)}
                      />
                    </p>
                  ))}
                </ListGroup.Item>
                <br />
                <br />
              </ListGroup>
              <Button
                variant="outline-primary"
                onClick={() => setQuestionNumber(questionNumber - 1)}
                disabled={questionNumber === 1}
              >
                Prev
              </Button>{" "}
              <Button
                variant="outline-primary"
                onClick={() => resetAnswerHandler()}
                disabled={questionNumber === totalCount}
              >
                Next
              </Button>{" "}
              <Button
                variant="outline-primary"
                onClick={() => submitHandler()}
                disabled={
                  questionNumber - 1 === totalCount || answer.length === 0
                }
              >
                Save & Next
              </Button>
            </Container>
          )}
        </Col>

        <Col md={3.5}>
          <Row style={{ marginTop: "-100px" }}>
            {paper && (
              <Clock
                totalTime={paper.duration * 60}
                testSubmitHandler={testSubmitHandler}
              />
            )}
          </Row>
          <Row>
            <Button
              variant="outline-primary"
              style={{ marginLeft: "180px", marginTop: "10px" }}
              onClick={() => testSubmitHandler()}
            >
              End Test
            </Button>
          </Row>
          <Row style={{ position: "center" }}>
            {arr &&
              arr.map((a) => (
                <div
                  className="box"
                  style={{
                    backgroundColor: `${
                      questionNumber === a ? "green" : "lightblue"
                    }`,
                  }}
                >
                  {a}
                </div>
              ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TestPaper;
