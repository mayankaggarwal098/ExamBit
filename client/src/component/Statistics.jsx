import React from "react";
import { useDispatch } from "react-redux";
import { Container, ListGroup, Button, Col, Row } from "react-bootstrap";
import { downloadResult } from "../actions/studentRegistrationAction";
import BarCharts from "../utils/BarCharts";
import PieChart from "../utils/PieChart";
import download from "downloadjs";
//import { saveAs } from "file-saver";
import { base64StringToBlob } from "blob-util";
const Statistics = ({ id }) => {
  const dispatch = useDispatch();
  const downloadResultHandler = async (id) => {
    const str = await downloadResult(id);
    var blob = base64StringToBlob(
      str,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    //console.log(blob);
    download(
      blob,
      "Result.xlsx",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    // // console.log(buff);
    // var blob = new Blob([buff], {
    //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // });
    // //console.log(blob);
    // const reader = new FileReader();
    // reader.readAsDataURL(blob);
    // reader.onloadend = async function () {
    //   const base64String = reader.result;
    //   console.log("Base64 String - ", base64String);
    //   // download(
    //   //   base64String,
    //   //   "Testpaper.xlsx",
    //   //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //   // );
    // };

    // saveAs(buff, "fileName.xlsx");
  };
  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col md={2}>
              <Button
                className="btn btn-block"
                variant="outline-danger"
                onClick={() => downloadResultHandler(id)}
              >
                Download
              </Button>
            </Col>
            <Col md={10}>
              <p style={{ fontSize: "20px" }}>
                Dowload the test result excel sheet
              </p>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <p>Score vs No of Student</p>
          <BarCharts />
        </ListGroup.Item>
        <ListGroup.Item>
          <Row style={{ position: "center" }}>
            <Col md={5}>
              <p>Pass/Fail</p>
              <PieChart />
            </Col>
            <Col md={5}>
              <p>Category</p>
              <PieChart />
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default Statistics;
