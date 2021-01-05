import * as test from '../constants/testConstant';
import http from '../component/httpService';
import { toast } from 'react-toastify';

export const createTest = (testPapers, testPaper) => async (
  dispatch,
  getState
) => {
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

    dispatch({ type: test.TEST_CREATE_SUCCESS });

    dispatch(getTestPaperList());
    toast.success(data);
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

export const testPaperDelete = (testPapers, id) => async (
  dispatch,
  getState
) => {
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

    const arr = testPapers.filter(t => t._id !== id);

    dispatch({ type: test.TEST_LIST_SUCCESS, payload: arr });

    toast.success(data);
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

export const testBegin = (id, index, testPapers) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: test.TEST_BEGIN_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'x-auth-token': `${userInfo.token}`,
      },
    };

    await http.post('/api/test/begin', { id }, config);

    const arr = [...testPapers];
    arr[index].isTestBegins = true;

    dispatch({ type: test.TEST_BEGIN_SUCCESS });

    dispatch({
      type: test.TEST_LIST_SUCCESS,
      payload: arr,
    });

    toast.success('test has been started');
  } catch (error) {
    if (
      error.response &&
      (error.response.status >= 400 || error.response.status <= 500)
    ) {
      toast.error(error.response.data);
    }

    dispatch({
      type: test.TEST_BEGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSinglePaper = id => async dispatch => {
  try {
    dispatch({ type: test.SINGLE_TESTPAPER_REQUEST });

    const { data } = await http.post('/api/student/questions', { id });

    dispatch({
      type: test.SINGLE_TESTPAPER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (
      error.response &&
      (error.response.status >= 400 || error.response.status <= 500)
    ) {
      toast.error(error.response.data);
    }

    dispatch({
      type: test.SINGLE_TESTPAPER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
