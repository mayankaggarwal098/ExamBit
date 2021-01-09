import React from 'react';
import { Modal, ListGroup } from 'react-bootstrap';

const SingleQuestion = ({ show, question, setShow }) => {
  const arr = ['A', 'B', 'C', 'D'];

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="my-modal"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>
              <b>SUBJECT</b>
            </strong>{' '}
            : {question.subject}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>
              <b>WEIGHTAGE</b>
            </strong>{' '}
            : {question.weightage}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>
              <b>QUESTION</b>
            </strong>{' '}
            : {question.questionBody}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>
              <b>OPTIONS</b>
            </strong>
            <br></br>
            {question.options.map((opt, index) => (
              <>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong>{arr[index]}</strong>: {opt.optionBody}
                <br></br>
              </>
            ))}
          </ListGroup.Item>
          {/* <ListGroup.Item>
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
          </ListGroup.Item> */}
          <ListGroup.Item>
            <strong>
              <b>EXPLAINATION</b>
            </strong>{' '}
            : {question.explaination}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default SingleQuestion;
