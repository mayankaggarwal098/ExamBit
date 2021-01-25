import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { supervisorList } from "../actions/supervisorAction";
import Loader from "../utils/Loader";
import SupervisorTable from "../component/SupervisorTable";
//PDFF
import download from "downloadjs";
import { Form, Button } from "react-bootstrap";
import http from "../utils/httpService";
//PDFF
const SupervisorList = ({ history }) => {
  const { loading, supervisors, error } = useSelector(
    (state) => state.supervisorList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!supervisors) {
      dispatch(supervisorList());
    }
  }, []);

  //PDFFFFFFFFF
  const [photo, setPhoto] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleOnChange = (event) => {
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      //  console.log(reader.result);
      setPhoto(reader.result);
      //var blob = window.dataURLtoBlob(reader.result);
      //setPhoto(file);
    };
    reader.readAsDataURL(file);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (photo) {
      // const formData = new FormData();
      // formData.append("photo", photo);
      // await http.post(`/api/pdf/upload`, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // console.log(formData);
      setIsSubmitted(true);
      console.log(photo);
      await http.post(`/api/pdf/upload`, { photo });
    }
  };

  const hdownload = async () => {
    const { data } = await http.get(
      `/api/pdf/download/600c040453f2ae075c71dc0e`
    );
    var string = data.toString("base64");
    console.log(data);
    download(data, "img.pdf", "application/pdf");
  };
  return (
    <>
      {loading && <Loader />}
      {supervisors && (
        <SupervisorTable supervisors={supervisors} permission={true} />
      )}

      <Form
        onSubmit={handleFormSubmit}
        method="post"
        encType="multipart/form-data"
      >
        <Form.Group>
          <Form.Label>Choose photo to upload</Form.Label>
          <Form.Control type="file" name="photo" onChange={handleOnChange} />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className={`${!photo ? "disabled submit-btn" : "submit-btn"}`}
          disabled={photo ? false : true}
        >
          Upload
        </Button>
        <button onClick={() => hdownload()}>download</button>
      </Form>
    </>
  );
};

export default SupervisorList;
