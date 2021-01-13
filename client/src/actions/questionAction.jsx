import * as question from '../constants/questionConstant';
import http from '../utils/httpService';
import { toast } from 'react-toastify';
import { getTestPaperList } from './testAction';
import Token from '../utils/Token';
import errorHandler from '../errorHandler';

export const addQuestion = (questions, newQuestion) => async dispatch => {
  try {
    // dispatch({ type: question.QUESTION_CREATE_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };
    const { data } = await http.post('/api/questions/create', newQuestion, Token());

    // dispatch({ type: question.QUESTION_CREATE_SUCCESS });

    const arr = [...questions];
    arr.push(data);
    dispatch({
      type: question.QUESTION_LIST_SUCCESS,
      payload: arr,
    });
    //dispatch(getAllQuestions());
  } catch (ex) {
    errorHandler(ex);
    // dispatch({
    //   type: question.QUESTION_CREATE_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const getAllQuestions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: question.QUESTION_LIST_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };

    const { data } = await http.get('/api/questions/details/all', Token());

    dispatch({
      type: question.QUESTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);
    // dispatch({
    //   type: question.QUESTION_LIST_FAIL,
    //   payload:
    //     ex.response && ex.response.data.message
    //       ? ex.response.data.message
    //       : ex.message,
    // });
  }
};

export const deleteQuestion = (questions, id) => async (dispatch, getState) => {
  try {
    // dispatch({ type: question.QUESTION_DELETE_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };

    const { data } = await http.delete(`/api/questions/delete/${id}`, Token());
    const arr = questions.filter(ques => ques._id !== id);

    // dispatch({ type: question.QUESTION_DELETE_SUCCESS });

    dispatch({ type: question.QUESTION_LIST_SUCCESS, payload: arr });
    dispatch(getTestPaperList());

    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
    // dispatch({
    //   type: question.QUESTION_DELETE_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};
