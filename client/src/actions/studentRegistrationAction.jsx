import * as student_reg from '../constants/studentRegistrationConstant';
import http from '../component/httpService';
import { toast } from 'react-toastify';

export const studentRegistrationForTest = students => async dispatch => {
  try {
    dispatch({ type: student_reg.STUDENT_REGISTRATION_REQUEST });

    const { data } = http.post(`/api/student/register`, students);

    dispatch({ type: student_reg.STUDENT_REGISTRATION_SUCCESS });
  } catch (error) {
    if (
      error.response &&
      (error.response.status >= 400 || error.response.status <= 500)
    ) {
      toast.error(error.response.data);
    }

    dispatch({
      type: student_reg.STUDENT_REGISTRATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
