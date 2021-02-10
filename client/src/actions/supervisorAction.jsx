import * as s from "../constants/supervisorConstant";
import http from "../utils/httpService";
import { toast } from "react-toastify";
import errorHandler from "../errorHandler";
import Token from "../utils/Token";

export const supervisorList = () => async (dispatch) => {
  try {
    dispatch({ type: s.SUPERVISOR_LIST_REQUEST });
    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };
    const { data } = await http.get(
      "/api/supervisor/auth/details/all",
      Token()
    );

    dispatch({
      type: s.SUPERVISOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);
    // dispatch({
    //   type: s.SUPERVISOR_LIST_FAIL,
    //   payload:
    //     ex.response && ex.response.data.message
    //       ? ex.response.data.message
    //       : ex.message,
    // });
  }
};
export const supervisorReqList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: s.SUPERVISOR_REQ_LIST_REQUEST });
    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };
    const { data } = await http.get(
      "/api/supervisor/request/details/all",
      Token()
    );

    dispatch({
      type: s.SUPERVISOR_REQ_LIST_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);
    // dispatch({
    //   type: s.SUPERVISOR_REQ_LIST_FAIL,
    //   payload:
    //     ex.response && ex.response.data.message
    //       ? ex.response.data.message
    //       : ex.message,
    // });
  }
};

export const removeSupervisor = (supervisors, id, permission) => async (
  dispatch,
  getState
) => {
  try {
    // dispatch({ type: s.SUPERVISOR_REMOVE_REQUEST });
    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };
    const { data } = await http.delete(`/api/supervisor/remove/${id}`, Token());

    // dispatch({
    //   type: s.SUPERVISOR_REMOVE_SUCCESS,
    // });

    const arr = supervisors.filter((s) => s._id !== id);
    if (permission === true) {
      dispatch({ type: s.SUPERVISOR_LIST_SUCCESS, payload: arr });
    } else {
      dispatch({ type: s.SUPERVISOR_REQ_LIST_SUCCESS, payload: arr });
    }
    toast.success(data);
  } catch (ex) {
    // const ex =
    //   error.response && error.response.data.message
    //     ? error.response.data.message
    //     : error.message;
    errorHandler(ex);
    // dispatch({
    //   type: s.SUPERVISOR_REMOVE_FAIL,
    //   payload: ex,
    // });
  }
};

export const updateSupervisor = (supervisor, status) => async (
  dispatch,
  getState
) => {
  console.log(supervisor);
  const id = supervisor._id;
  try {
    dispatch({ type: s.SUPERVISOR_UPDATEPERM_REQUEST });
    const {
      supervisorList: { supervisors },
      supervisorReqList: { supervisors: requests },
    } = getState();
    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };
    const { data } = await http.post(
      `/api/supervisor/change/permission`,
      { id, status },
      Token()
    );

    dispatch({
      type: s.SUPERVISOR_UPDATEPERM_SUCCESS,
    });

    if (status === true) {
      const arr = requests.filter((s) => s._id !== id);
      dispatch({ type: s.SUPERVISOR_REQ_LIST_SUCCESS, payload: arr });
      dispatch({
        type: s.SUPERVISOR_LIST_SUCCESS,
        payload: [...supervisors, supervisor],
      });
    } else {
      const arr = supervisors.filter((s) => s._id !== id);
      dispatch({ type: s.SUPERVISOR_LIST_SUCCESS, payload: arr });
      dispatch({
        type: s.SUPERVISOR_REQ_LIST_SUCCESS,
        payload: [...requests, supervisor],
      });
    }
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
    // dispatch({
    //   type: s.SUPERVISOR_UPDATEPERM_FAIL,
    //   payload:
    //     ex.response && ex.response.data.message
    //       ? ex.response.data.message
    //       : ex.message,
    // });
  }
};

export const deleteMedia = async () => {
  const { data } = await http.delete(`/api/supervisor/delete/media`, Token());
  console.log(data);
};
