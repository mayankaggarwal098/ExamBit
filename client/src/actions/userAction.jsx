import http from '../utils/httpService';
import { toast } from 'react-toastify';
import { QUESTION_LIST_RESET } from '../constants/questionConstant';
import { TEST_LIST_RESET } from '../constants/testConstant';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstanst';
import { GROUP_RESET } from '../constants/groupConstant';
import errorHandler from '../errorHandler';

export const userRegister = async (newUser, history) => {
  try {
    // dispatch({ type: USER_REGISTER_REQUEST });

    await http.post('/api/signup', newUser);

    // dispatch({
    //   type: USER_REGISTER_SUCCESS,
    // });

    toast.success('Successfully Register');
    history.push('/login');
  } catch (ex) {
    errorHandler(ex);

    // dispatch({
    //   type: USER_REGISTER_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await http.post('/api/login', { email, password });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    toast.success('Successfully login');
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (ex) {
    errorHandler(ex);

    // dispatch({
    //   type: USER_LOGIN_FAIL,
    //   payload:
    //     ex.response && ex.response.data.message
    //       ? ex.response.data.message
    //       : ex.message,
    // });
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({ type: QUESTION_LIST_RESET });
  dispatch({ type: TEST_LIST_RESET });
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: GROUP_RESET });
};
