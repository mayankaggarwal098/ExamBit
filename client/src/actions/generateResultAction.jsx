import * as gen_result from '../constants/generateResultConstant';
import http from '../utils/httpService';
import errorHandler from '../errorHandler';
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
  } catch (ex) {
    errorHandler(ex);
    // dispatch({
    //   type: gen_result.GENERATE_RESULT_FAIL,
    //   payload:
    //     ex.response && ex.response.data.message
    //       ? ex.response.data.message
    //       : ex.message,
    // });
  }
};
