import * as res_sheet from '../constants/responseSheetConstant';
import http from '../component/httpService';
import { toast } from 'react-toastify';

export const responseSheetOfStudent = async ({ studentId, testId }) => {
  try {
    // dispatch({ type: res_sheet.STUDENT_RESPONSE_SHEET_REQUEST });

    const { data } = await http.post('/api/student/responseSheet', {
      studentId,
      testId,
    });

    // dispatch({ type: res_sheet.STUDENT_RESPONSE_SHEET_SUCCESS });
    toast.success(data);
  } catch (error) {
    if (
      error.response &&
      (error.response.status >= 400 || error.response.status <= 500)
    ) {
      toast.error(error.response.data);
    }
    // dispatch({
    //   type: res_sheet.STUDENT_RESPONSE_SHEET_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const addAnswerForGivenQuestion = async body => {
  try {
    // dispatch({ type: res_sheet.STUDENT_ANSWER_REQUEST });

    const { data } = await http.post('/api/student/updateResponse', body);

    // dispatch({ type: res_sheet.STUDENT_ANSWER_SUCCESS });
    toast.success(data);
  } catch (error) {
    if (
      error.response &&
      (error.response.status >= 400 || error.response.status <= 500)
    ) {
      toast.error(error.response.data);
    }
    // dispatch({
    //   type: res_sheet.STUDENT_ANSWER_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};
