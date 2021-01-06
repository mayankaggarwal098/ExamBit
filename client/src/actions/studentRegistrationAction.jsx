import * as student_reg from '../constants/studentRegistrationConstant';
import * as test from '../constants/testConstant';
import http from '../component/httpService';
import { toast } from 'react-toastify';

export const studentRegistrationForTest = students => async dispatch => {
  try {
    dispatch({ type: student_reg.STUDENT_REGISTRATION_REQUEST });

    const { data } = await http.post('/api/student/register', students);

    dispatch({ type: student_reg.STUDENT_REGISTRATION_SUCCESS });
    toast.success(data);
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

export const openRegistrationforTest = ({ testPapers, id, status }) => async (
  dispatch,
  getState
) => {
  const STATUS = status ? 'OPEN' : 'CLOSE';
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'x-auth-token': `${userInfo.token}`,
      },
    };
    const { data } = http.post(
      '/api/test/change-registration-status',
      { id, status },
      config
    );

    dispatch({ type: `REGISTRATION_${STATUS}_SUCCESS` });

    const arr = [...testPapers];
    const index = arr.findIndex(test => test._id === id);

    arr[index].isRegistrationAvailable = status;

    dispatch({
      type: test.TEST_LIST_SUCCESS,
      payload: arr,
    });
    toast.success(data);
  } catch (error) {
    if (
      error.response &&
      (error.response.status >= 400 || error.response.status <= 500)
    ) {
      toast.error(error.response.data);
    }

    dispatch({
      type: `REGISTRATION_${STATUS}_SUCCESS`,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
