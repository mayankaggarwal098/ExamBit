import React, { useState } from 'react';
import { Container, Tabs, Tab, Button } from 'react-bootstrap';
import Tables from '../component/Tables';
import TestTable from '../component/TestTable';
import { getGroupTestPaper } from '../actions/groupAction';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StudentGroupTestTable from '../component/StudentGroupTestTable';
import Loader from '../utils/Loader';

const GroupDetails = () => {
  const { id: groupId } = useParams();

  const [conductedTestPaper, setConductedTestPaper] = useState([]);
  const [notConductedTestPaper, setNotConductedTestPaer] = useState([]);
  const [loader, setLoader] = useState(false);

  const { userInfo } = useSelector(state => state.userLogin);

  const getTestPaper = async () => {
    setLoader(true);
    const paper = await getGroupTestPaper(groupId);

    const paper1 = paper.filter(p => !p.isTestConducted);
    const paper2 = paper.filter(p => p.isTestConducted);

    setNotConductedTestPaer(paper1);
    setConductedTestPaper(paper2);

    setLoader(false);
  };

  useState(() => {
    getTestPaper();
  }, []);

  return (
    <Container className="my-3">
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
        <Tabs defaultActiveKey={'Members'}>
          <Tab
            eventKey="Members"
            // disabled={!testPaperSheet[pos].isTestConducted}
            title={<i className="fas fa-user"> Members</i>}
          >
            <Tables />
          </Tab>
          <Tab
            eventKey="upcoming test"
            title={<i className="fa fa-pencil"> Upcoming Test</i>}
          >
            {notConductedTestPaper &&
              (userInfo.category === 'SUPERVISOR' ? (
                <TestTable
                  testPapers={notConductedTestPaper}
                  isShow={true}
                  deleteEdit={false}
                />
              ) : (
                <div className="my-1">
                  <Button
                    variant="outline-primary"
                    className="my-3"
                    onClick={() => getTestPaper()}
                  >
                    <i className="fas fa-sync"></i>&nbsp;&nbsp;Refresh
                  </Button>
                  {loader && <Loader />}
                  <StudentGroupTestTable
                    testPapers={notConductedTestPaper}
                    isShow={true}
                  />
                </div>
              ))}
          </Tab>

          <Tab
            eventKey="past test"
            title={<i className="fa fa-pencil"> Past Test</i>}
          >
            {conductedTestPaper &&
              (userInfo.category === 'SUPERVISOR' ? (
                <TestTable
                  testPapers={conductedTestPaper}
                  isShow={false}
                  deleteEdit={false}
                />
              ) : (
                <div className="my-1">
                  <Button
                    variant="outline-primary"
                    className="my-3"
                    onClick={() => getTestPaper()}
                  >
                    <i className="fas fa-sync"></i>&nbsp;&nbsp;Refresh
                  </Button>
                  {loader && <Loader />}
                  <StudentGroupTestTable
                    testPapers={conductedTestPaper}
                    isShow={false}
                  />
                </div>
              ))}
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default GroupDetails;
