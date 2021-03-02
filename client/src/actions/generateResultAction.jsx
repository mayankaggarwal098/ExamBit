import * as gen_result from '../constants/generateResultConstant';
import http from '../utils/httpService';
import errorHandler from '../errorHandler';
import { toast } from 'react-toastify';
import Token from '../utils/Token';

export const resultGenerate = ({ testId, studentId }) => async dispatch => {
  try {
    dispatch({ type: gen_result.GENERATE_RESULT_REQUEST });

    const { data } = await http.post(
      '/api/result/generateresult',
      {
        testId,
        studentId,
      },
      Token()
    );

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

export const resultGeneratePdf = async (testId, studentId) => {
  try {
    const { data } = await http.post(
      '/api/result/generateresult/pdf',
      {
        testId,
        studentId,
      },
      Token()
    );
    console.log(data);
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getScore = async testId => {
  try {
    const { data } = await http.post(
      '/api/result/all/score',
      {
        testId,
      },
      Token()
    );
    //console.log(data);
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const editResultScore = async (testId, studentId, score) => {
  try {
    const { data } = await http.post(
      '/api/result/edit/score',
      {
        testId,
        studentId,
        score,
      },
      Token()
    );
    // console.log(data);
    toast.success(data);
    getRanksOfStudent();
    //return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getRanksOfStudent = async testId => {
  try {
    const { data } = await http.post(
      '/api/result/students/rank',
      { testId },
      Token()
    );
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};
