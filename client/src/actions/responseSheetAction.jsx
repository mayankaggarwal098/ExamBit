import * as res_sheet from '../constants/responseSheetConstant';
import http from '../utils/httpService';
import errorHandler from '../errorHandler';
import { toast } from 'react-toastify';
import Token from '../utils/Token';

export const responseSheetOfStudent = async ({ studentId, testId }) => {
  try {
    // dispatch({ type: res_sheet.STUDENT_RESPONSE_SHEET_REQUEST });

    const { data } = await http.post('/api/student/responseSheet', {
      studentId,
      testId,
    });

    // dispatch({ type: res_sheet.STUDENT_RESPONSE_SHEET_SUCCESS });
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
    // dispatch({
    //   type: res_sheet.STUDENT_RESPONSE_SHEET_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const getResponsePdf = async (studentId, testId) => {
  try {
    const { data } = await http.post('/api/student/responseSheet/pdf', {
      studentId,
      testId,
    });
    console.log(data);
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const addAnswerForGivenQuestion = async body => {
  try {
    // dispatch({ type: res_sheet.STUDENT_ANSWER_REQUEST });

    const { data } = await http.post('/api/student/updateResponse', body);

    // dispatch({ type: res_sheet.STUDENT_ANSWER_SUCCESS });
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
    // dispatch({
    //   type: res_sheet.STUDENT_ANSWER_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const uploadPdf = async (testId, studentId, pdf) => {
  try {
    const { data } = await http.post('/api/student/pdf/upload', {
      testId,
      studentId,
      pdf,
    });
    toast.success(`ResponseSheet uploaded successfully`);
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const checkGivenTestForStudent = async (testId, studentId) => {
  try {
    const { data } = await http.post(
      '/api/student/test/complete',
      { testId, studentId },
      Token()
    );
    console.log(data);
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};
