import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const StudentGroupTestTable = ({ testPapers, isShow }) => {
  const { userInfo } = useSelector(state => state.userLogin);

  const studentId = userInfo && userInfo._id;
  const history = useHistory();

  // const checkTestGiven = async testId => {
  //   try {
  //     const flag = await checkGivenTestForStudent(testId, studentId);
  //     return flag;
  //   } catch (ex) {
  //     errorHandler(ex);
  //   }
  // };

  const resultHandler = testId => {
    history.push(
      `/student/test/result?testId=${testId}&studentId=${studentId}`
    );
  };

  const enterhandler = testId => {
    history.push(`/student/test?testid=${testId}&studentid=${studentId}`);
  };
  return (
    <Table responsive hover bordered striped className="table-centered">
      <thead>
        <tr>
          <th>SUBJECT</th>
          <th>TITLE</th>
          <th>DURATION(IN MIN)</th>
          <th>CATEGORY</th>
          {isShow ? (
            <>
              <th>START TIME</th>
              <th>ENTER</th>
            </>
          ) : (
            <th>RESULT</th>
          )}
        </tr>
      </thead>
      <tbody>
        {testPapers &&
          testPapers.map(test => (
            <tr key={test._id}>
              <td>{test.subject}</td>
              <td>{test.title}</td>
              <td>{test.duration}</td>
              <td>{test.category}</td>
              {isShow ? (
                <>
                  <td>Date - {test.startTime.substr(0, 10)}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className="btn-block"
                      onClick={() => enterhandler(test._id)}
                    >
                      Enter
                    </Button>
                  </td>
                </>
              ) : (
                <td>
                  <Button
                    variant="outline-primary"
                    className="btn-block"
                    onClick={() => resultHandler(test._id)}
                  >
                    Result
                  </Button>
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default StudentGroupTestTable;
