import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { checkTestStart, startTestTime } from '../actions/testAction';
import Timer from '../utils/Timer';

const Instruction = ({ history }) => {
  const query = new URLSearchParams(useLocation().search);
  const testId = query.get('testid');
  const studentId = query.get('studentid');

  const [show, setShow] = useState();
  const [testTime, setTestTime] = useState(null);

  console.log(testTime);
  useEffect(() => {
    async function getTestTime() {
      const time = await startTestTime(testId);
      setTestTime(time.startTime);
    }
    getTestTime();
  });

  const submitHandler = async id => {
    const start = await checkTestStart(testId);
    if (start) {
      history.push(`/student/test/start?testId=${testId}&studentId=${studentId}`);
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <div className="instaruction-page-wrapper">
        <div>
          <div className="clock">
            <h3>Time Left</h3>
            <div className="stopwatch-card">
              <p>
                <Timer time={testTime} duration={-1} testId={testId} endTest={submitHandler} />
              </p>
            </div>
          </div>
          <div className="instruction-page-inner">
            <h2>General Instructions:</h2>
            <h4>1. All questions are compulsory.</h4>
            <h4>2. You can bookmark any question.</h4>
            <h4>3. Answers can be updated anytime before the time limit.</h4>
            <h4>
              4. Before Update the answer firstly UnCheck the previous answer and then updated it.
            </h4>
            <h4>5. This test is time bound,there's a timer on the right panel.</h4>
            <h4>6. Click on 'End Test' button to submit test before time limit. </h4>
            <h4>7. The test will be automatically submitted when the clock reads 0:0.</h4>
            <h4>
              <b>NOTE :</b>To save answers,click on the 'Save & Next' button.
            </h4>
            <div className="proceed-to-test-button">
              <Button
                style={{ float: 'right' }}
                variant="outline-primary"
                icon="caret-right"
                onClick={() => submitHandler()}
              >
                Proceed To Test
              </Button>
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="example-custom-modal-styling-title"
          variant="success"
        >
          <Modal.Body>
            <div className="justify-content-centre">
              <p style={{ marginLeft: '80px' }}>Test is not started Yet</p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Instruction;
