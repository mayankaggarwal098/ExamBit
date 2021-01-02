import * as test from '../constants/testConstant';
import http from '../component/httpService';
import { toast } from 'react-toastify';

export const createTest = testPaper => async (dispatch, getState) => {
  try {
    dispatch({ type: test.TEST_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'x-auth-token': `${userInfo.token}`,
      },
    };

    const { data } = await http.post('/api/test/create', testPaper, config);

    console.log(data);
    dispatch({
      type: test.TEST_CREATE_SUCCESS,
      payload: data,
    });

    toast.success('Successfully created');
    dispatch(getTestPaperList());
  } catch (error) {
    toast.error('Something Went Wrong');
    dispatch({
      type: test.TEST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTestPaperList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: test.TEST_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'x-auth-token': `${userInfo.token}`,
      },
    };

    const { data } = await http.get('/api/test/details/all', config);

    dispatch({
      type: test.TEST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toast.error('Something Went Wrong');
    dispatch({
      type: test.TEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const testPaperDelete = id => async (dispatch, getState) => {
  try {
    dispatch({ type: test.TEST_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'x-auth-token': `${userInfo.token}`,
      },
    };

    const { data } = await http.post('/api/test/delete', { id }, config);

    dispatch({ type: test.TEST_DELETE_SUCCESS });

    toast.success(data);
    dispatch(getTestPaperList());
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error(error.response.data);
    }

    dispatch({
      type: test.TEST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
