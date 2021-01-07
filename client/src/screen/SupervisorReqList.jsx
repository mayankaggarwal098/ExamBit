import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { supervisorReqList } from "../actions/supervisorAction";
import Loader from "../component/Loader";
import SupervisorTable from "../component/SupervisorTable";

const SupervisorReqList = ({ history }) => {
  const { loading, supervisors, error } = useSelector(
    (state) => state.supervisorReqList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!supervisors) {
      dispatch(supervisorReqList());
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      {supervisors && (
        <SupervisorTable supervisors={supervisors} permission={false} />
      )}
    </>
  );
};

export default SupervisorReqList;
