import * as gen_result from '../constants/generateResultConstant';
import http from '../component/httpService';
import { toast } from 'react-toastify';

export const resultGenerate = ({ testId, studentId }) => async dispatch => {
  try {
    dispatch({ type: gen_result.GENERATE_RESULT_REQUEST });

    const { data } = await http.post('/api/result/generateresult', {
      testId,
      studentId,
    });

    dispatch({ type: gen_result.GENERATE_RESULT_SUCCESS, payload: data });
    toast.success('Result Generated');
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      toast.error(error.response.data);
    }
    dispatch({
      type: gen_result.GENERATE_RESULT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
