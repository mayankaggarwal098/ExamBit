import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getStudentRecord } from '../actions/studentRegistrationAction';
import LineChart from '../utils/LineChart';

const Profile = () => {
  const [groupData, setGroupData] = useState([]);
  const [groupLabel, setGroupLabel] = useState([]);

  const { userInfo } = useSelector(state => state.userLogin);
  const studentId = userInfo && userInfo._id;
  useEffect(() => {
    getRecord();
  }, []);

  const getRecord = async () => {
    const studentRecord = await getStudentRecord(studentId);
    const groupRecord =
      studentRecord &&
      studentRecord.filter(s => s.testId.paperType === 'GROUP');
    const organisationRecord =
      studentRecord &&
      studentRecord.filter(s => s.testId.paperType === 'ORGANISATION');

    let data1 = [];
    let label1 = [];

    groupRecord.map(g => {
      let percentage = (g.score / g.maxMarks) * 100;
      data1.push(percentage);
      label1.push(g.testId.startTime.substr(0, 10));
    });

    setGroupData(data1);
    setGroupLabel(label1);
  };
  return (
    <Container className="my-3">
      <div className="shadow-lg p-3 mb-5 bg-white rounded">
        <p>STUDENT PROFILE</p>
        <Row>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Name :</strong> {userInfo.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email :</strong> {userInfo.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Category :</strong> {userInfo.category}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <ListGroup>
          <ListGroup.Item>
            <p>Groups Rating</p>
            <LineChart
              LineData={{
                labels: groupLabel,
                datasets: [
                  {
                    label: 'Percentage',
                    data: groupData,
                    fill: false,
                  },
                ],
              }}
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <p>Organisation Rating</p>
            <LineChart />
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
};

export default Profile;
