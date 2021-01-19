import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import Loader from "../utils/Loader";
import { getAllRegisteredStudent } from "../actions/studentRegistrationAction";

const Trainees = ({ id }) => {
  const dispatch = useDispatch();
  const { loading, registeredStudent: students } = useSelector(
    (state) => state.registeredStudentList
  );

  useEffect(() => {
    dispatch(getAllRegisteredStudent(id));
  }, []);

  const resultWindowHandler = (studentId) => {
    window.open(`/student/test/result?testId=${id}&studentId=${studentId}`);
  };
  const snapshotHandler = (studentId) => {
    window.open(`/student/test/snapshots?testId=${id}&studentId=${studentId}`);
  };
  const audioHandler = (studentId) => {
    window.open(`/student/test/audio?testId=${id}&studentId=${studentId}`);
  };
  return (
    <>
      {loading && <Loader />}
      <Button
        className="my-3"
        onClick={() => dispatch(getAllRegisteredStudent(id))}
      >
        <i className="fas fa-sync"></i>&nbsp;&nbsp;Reload
      </Button>
      <Table
        hover
        bordered
        striped
        responsive
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        <thead>
          <tr>
            <th>SNo.</th>
            <th>STUDENT NAME</th>
            <th>EMAIL ID</th>
            <th>MOBILE NO.</th>
            <th>PERFORMANCE</th>
            <th>SNAPSHOT</th>
            <th>Audio Recording</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((stud, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{stud.name}</td>
                <td>{stud.email}</td>
                <td>{stud.phoneNum}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => resultWindowHandler(stud._id)}
                  >
                    Result
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => snapshotHandler(stud._id)}
                  >
                    SnapShot
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => audioHandler(stud._id)}
                  >
                    Audio
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default Trainees;
