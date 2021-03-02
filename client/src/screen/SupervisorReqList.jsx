import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { supervisorReqList } from '../actions/supervisorAction';
import Loader from '../utils/Loader';
import SupervisorTable from '../component/SupervisorTable';

const SupervisorReqList = () => {
  const { loading, supervisors } = useSelector(
    state => state.supervisorReqList
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
