import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './clock.css';

const Instruction = props => {
  const query = new URLSearchParams(useLocation().search);
  const testId = query.get('testid');
  const studentId = query.get('studentid');
  return (
    <div>
      <div className="instaruction-page-wrapper">
        <div className="instruction-page-inner">
          <h2>General Instructions:</h2>
          <h4>1. All questions are compulsory.</h4>
          <h4>2. You can bookmark any question.</h4>
          <h4>3. Answers can be updated anytime before the time limit.</h4>
          <h4>
            4. Before Update the answer firstly UnCheck the previous answer and
            then updated it.
          </h4>
          <h4>
            5. This test is time bound,there's a timer on the right panel.
          </h4>
          <h4>
            6. Click on 'End Test' button to submit test before time limit.{' '}
          </h4>
          <h4>
            7. The test will be automatically submitted when the clock reads
            0:0.
          </h4>
          <h4>
            <b>NOTE :</b>To save answers,click on the 'Save & Next' button.
          </h4>
          <div className="proceed-to-test-button">
            <Link
              to={`/student/test/start?testId=${testId}&studentId=${studentId}`}
            >
              <Button
                style={{ float: 'right' }}
                variant="outline-primary"
                icon="caret-right"
              >
                Proceed To Test
              </Button>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Instruction;
