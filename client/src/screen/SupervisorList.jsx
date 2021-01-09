import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { supervisorList } from '../actions/supervisorAction';
import Loader from '../component/Loader';
import SupervisorTable from '../component/SupervisorTable';

const SupervisorList = ({ history }) => {
  const { loading, supervisors, error } = useSelector(
    state => state.supervisorList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!supervisors) {
      dispatch(supervisorList());
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      {supervisors && (
        <SupervisorTable supervisors={supervisors} permission={true} />
      )}
    </>
  );
};

export default SupervisorList;
