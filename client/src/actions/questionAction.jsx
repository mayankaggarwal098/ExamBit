import * as question from '../constants/questionConstant';
import http from '../component/httpService';
import { toast } from 'react-toastify';

export const addQuestion = newQuestion => async (dispatch, getState) => {
  try {
    dispatch({ type: question.QUESTION_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'x-auth-token': `${userInfo.token}`,
      },
    };
    const { data } = await http.post(
      '/api/questions/create',
      newQuestion,
      config
    );

    dispatch({
      type: question.QUESTION_CREATE_SUCCESS,
      payload: data,
    });

    dispatch(getAllQuestions());
  } catch (error) {
    dispatch({
      type: question.QUESTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllQuestions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: question.QUESTION_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'x-auth-token': `${userInfo.token}`,
      },
    };

    const { data } = await http.get('/api/questions/details/all', config);

    dispatch({
      type: question.QUESTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: question.QUESTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteQuestion = id => async (dispatch, getState) => {
  try {
    dispatch({ type: question.QUESTION_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'x-auth-token': `${userInfo.token}`,
      },
    };

    const { data } = await http.delete(`/api/questions/delete/${id}`, config);

    dispatch({ type: question.QUESTION_DELETE_SUCCESS });
    dispatch(getAllQuestions());
    toast.success(data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error(error.response.data);
    }

    dispatch({
      type: question.QUESTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
