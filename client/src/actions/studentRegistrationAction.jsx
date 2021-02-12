import * as student_reg from '../constants/studentRegistrationConstant';
import * as test from '../constants/testConstant';
import http from '../utils/httpService';
import Token from '../utils/Token';
import errorHandler from '../errorHandler';
import { toast } from 'react-toastify';

export const studentRegistrationForTest = async (students, history) => {
  try {
    // dispatch({ type: student_reg.STUDENT_REGISTRATION_REQUEST });

    const testId = students.testId;
    const { data } = await http.post('/api/student/register', students);

    // dispatch({ type: student_reg.STUDENT_REGISTRATION_SUCCESS });
    toast.success(data);
    history.push(`/student/registration/test/${testId}/emailsent`);
  } catch (ex) {
    errorHandler(ex);
    // dispatch({
    //   type: student_reg.STUDENT_REGISTRATION_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const openRegistrationforTest = ({
  testPapers,
  id,
  status,
}) => async dispatch => {
  // const STATUS = status ? 'OPEN' : 'CLOSE';
  try {
    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };

    const { data } = http.post(
      '/api/test/change-registration-status',
      { id, status },
      Token()
    );

    // dispatch({ type: `REGISTRATION_${STATUS}_SUCCESS` });

    const arr = [...testPapers];
    const index = arr.findIndex(test => test._id === id);

    arr[index].isRegistrationAvailable = status;

    dispatch({
      type: test.TEST_LIST_SUCCESS,
      payload1: arr,
    });
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);

    // dispatch({
    //   type: `REGISTRATION_${STATUS}_SUCCESS`,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const getStudentDetail = id => async dispatch => {
  try {
    dispatch({ type: student_reg.STUDENT_DETAIL_REQUEST });

    const { data } = await http.post('/api/student/details', { id });

    dispatch({
      type: student_reg.STUDENT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);

    // dispatch({
    //   type: student_reg.STUDENT_DETAIL_FAIL,
    //   payload:
    //     ex.response && ex.response.data.message
    //       ? ex.response.data.message
    //       : ex.message,
    // });
  }
};

export const downloadResult = async testId => {
  try {
    // dispatch({ type: student_reg.RESULT_DOWNLOAD_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState;
    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };

    const { data } = await http.post(
      '/api/result/download',
      { testId },
      Token()
    );
    //console.log(data);
    return data;
    // dispatch({ type: student_reg.RESULT_DOWNLOAD_SUCCESS });
  } catch (ex) {
    errorHandler(ex);

    // dispatch({
    //   type: student_reg.RESULT_DOWNLOAD_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const getAllRegisteredStudent = testId => async dispatch => {
  try {
    dispatch({ type: student_reg.GET_ALL_REGISTERED_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };

    const { data } = await http.post(
      '/api/test/students/all',
      { testId },
      Token()
    );

    dispatch({
      type: student_reg.GET_ALL_REGISTERED_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);

    // dispatch({
    //   type: student_reg.GET_ALL_REGISTERED_FAIL,
    //   payload:
    //     ex.response && ex.response.data.message
    //       ? ex.response.data.message
    //       : ex.message,
    // });
  }
};

export const studentsPrevPaper = async () => {
  try {
    const { data } = await http.get('/api/student/previous-paper', Token());
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const studentTestPaperList = () => async dispatch => {
  try {
    dispatch({ type: student_reg.STUDENT_TEST_LIST_REQUEST });

    const { data } = await http.get('/api/student/alltest', Token());

    console.log(data);
    const paper1 = data.filter(p => !p.isTestConducted);
    const paper2 = data.filter(p => p.isTestConducted);

    dispatch({
      type: student_reg.STUDENT_TEST_LIST_SUCCESS,
      payload1: paper1,
      payload2: paper2,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};
