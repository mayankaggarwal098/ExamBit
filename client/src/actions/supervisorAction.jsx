import * as s from '../constants/supervisorConstant';
import http from '../utils/httpService';
import { toast } from 'react-toastify';
import errorHandler from '../errorHandler';
import Token from '../utils/Token';

export const supervisorList = () => async dispatch => {
  try {
    dispatch({ type: s.SUPERVISOR_LIST_REQUEST });
    const { data } = await http.get(
      '/api/supervisor/auth/details/all',
      Token()
    );

    dispatch({
      type: s.SUPERVISOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};
export const supervisorReqList = () => async dispatch => {
  try {
    dispatch({ type: s.SUPERVISOR_REQ_LIST_REQUEST });

    const { data } = await http.get(
      '/api/supervisor/request/details/all',
      Token()
    );

    dispatch({
      type: s.SUPERVISOR_REQ_LIST_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};

export const removeSupervisor = (
  supervisors,
  id,
  permission
) => async dispatch => {
  try {
    const { data } = await http.delete(`/api/supervisor/remove/${id}`, Token());

    const arr = supervisors.filter(s => s._id !== id);
    if (permission === true) {
      dispatch({ type: s.SUPERVISOR_LIST_SUCCESS, payload: arr });
    } else {
      dispatch({ type: s.SUPERVISOR_REQ_LIST_SUCCESS, payload: arr });
    }
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
  }
};

export const updateSupervisor = (supervisor, status) => async (
  dispatch,
  getState
) => {
  //console.log(supervisor);
  const id = supervisor._id;
  try {
    dispatch({ type: s.SUPERVISOR_UPDATEPERM_REQUEST });
    const {
      supervisorList: { supervisors },
      supervisorReqList: { supervisors: requests },
    } = getState();

    const { data } = await http.post(
      `/api/supervisor/change/permission`,
      { id, status },
      Token()
    );

    dispatch({
      type: s.SUPERVISOR_UPDATEPERM_SUCCESS,
    });

    if (status === true) {
      const arr = requests.filter(s => s._id !== id);
      dispatch({ type: s.SUPERVISOR_REQ_LIST_SUCCESS, payload: arr });
      dispatch({
        type: s.SUPERVISOR_LIST_SUCCESS,
        payload: [...supervisors, supervisor],
      });
    } else {
      const arr = supervisors.filter(s => s._id !== id);
      dispatch({ type: s.SUPERVISOR_LIST_SUCCESS, payload: arr });
      dispatch({
        type: s.SUPERVISOR_REQ_LIST_SUCCESS,
        payload: [...requests, supervisor],
      });
    }
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
  }
};

export const deleteMedia = async () => {
  try {
    const { data } = await http.delete(`/api/supervisor/delete/media`, Token());
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
  }
};
