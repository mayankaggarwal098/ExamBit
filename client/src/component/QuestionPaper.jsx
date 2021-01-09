import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';

const QuestionPaper = ({ testPaperSheet, pos }) => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <Row
          style={{
            width: '200px',
            margin: 'auto',
          }}
        >
          <h3>Test Paper</h3>
        </Row>
        <Row>
          <Col md={10}>
            <strong>
              <b>SUBJECT</b>
            </strong>{' '}
            : {testPaperSheet[pos].subject}
            <br />
            <br />
            <strong>
              <b>TITLE</b>
            </strong>{' '}
            : {testPaperSheet[pos].title}
          </Col>
          <Col>
            <strong>
              <b>DURATION</b>
            </strong>{' '}
            : {testPaperSheet[pos].duration}
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        {testPaperSheet[pos].questions.map((question, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col md={0.6}>
                <strong>{index + 1}: </strong>
              </Col>
              <Col>
                <Row>
                  <Col md={1}>
                    <strong>Question: </strong>
                  </Col>
                  <Col md={10}>{question.questionBody}</Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={0.6}></Col>

              <Col md={1}>
                <strong> Options: </strong>
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
          </ListGroup.Item>
        ))}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default QuestionPaper;
