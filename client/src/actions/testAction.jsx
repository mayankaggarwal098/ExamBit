import * as test from "../constants/testConstant";
import http from "../utils/httpService";
import { toast } from "react-toastify";
import Token from "../utils/Token";
import errorHandler from "../errorHandler";

export const createTest = (testPaper) => async (dispatch) => {
  try {
    // dispatch({ type: test.TEST_CREATE_REQUEST });
    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };

    const { data } = await http.post("/api/test/create", testPaper, Token());

    // dispatch({ type: test.TEST_CREATE_SUCCESS });

    dispatch(getNotConductedTestPaper());
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
    // dispatch({
    //   type: test.TEST_CREATE_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const getNotConductedTestPaper = () => async (dispatch) => {
  try {
    // dispatch({ type: test.TEST_LIST_REQUEST });
    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };

    const { data } = await http.get("/api/test/details/all", Token());

    dispatch({
      type: test.TEST_LIST_SUCCESS,
      payload1: data,
    });
  } catch (ex) {
    errorHandler(ex);
    // dispatch({
    //   type: test.TEST_LIST_FAIL,
    //   payload:
    //     ex.response && ex.response.data.message
    //       ? ex.response.data.message
    //       : ex.message,
    // });
  }
};

export const getConductedTestPaper = () => async (dispatch) => {
  try {
    dispatch({ type: test.TEST_LIST_REQUEST });
    const { data } = await http.get("/api/test/conducted/details/all", Token());

    dispatch({
      type: test.TEST_LIST_SUCCESS,
      payload2: data,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};

export const testPaperDelete = (testPapers, id, show) => async (dispatch) => {
  try {
    // dispatch({ type: test.TEST_DELETE_REQUEST });
    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };

    const { data } = await http.post("/api/test/delete", { id }, Token());

    // dispatch({ type: test.TEST_DELETE_SUCCESS });

    const arr = testPapers.filter((t) => t._id !== id);

    if (show) {
      dispatch({ type: test.TEST_LIST_SUCCESS, payload1: arr });
    } else {
      dispatch({ type: test.TEST_LIST_SUCCESS, payload2: arr });
    }

    toast.success(data);
  } catch (ex) {
    errorHandler(ex);

    // dispatch({
    //   type: test.TEST_DELETE_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const testBegin = (id, index, testPapers) => async (
  dispatch,
  getState
) => {
  try {
    // dispatch({ type: test.TEST_BEGIN_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // const config = {
    //   headers: {
    //     'x-auth-token': `${userInfo.token}`,
    //   },
    // };

    await http.post("/api/test/begin", { id }, Token());

    const arr = [...testPapers];
    arr[index].isTestBegins = true;
    arr[index].isRegistrationAvailable = false;

    // dispatch({ type: test.TEST_BEGIN_SUCCESS });

    dispatch({
      type: test.TEST_LIST_SUCCESS,
      payload1: arr,
    });

    toast.success("test has been started");
  } catch (ex) {
    errorHandler(ex);

    // dispatch({
    //   type: test.TEST_BEGIN_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const testEnd = async ({ testId, studentId }) => {
  try {
    // dispatch({ type: test.TEST_END_REQUEST });

    const { data } = await http.post("/api/student/endTest", {
      testId,
      studentId,
    });

    // dispatch({ type: test.TEST_END_SUCCESS });

    toast.success(data);
  } catch (ex) {
    errorHandler(ex);

    // dispatch({
    //   type: test.TEST_END_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const testEndByTeacher = (testPapers, id, index) => async (dispatch) => {
  try {
    const { data } = await http.post("/api/test/end", { id }, Token());

    const arr = testPapers.filter((t) => t._id !== id);

    dispatch({ type: test.TEST_LIST_SUCCESS, payload1: arr });
    toast.success(data);
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getSinglePaper = (id) => async (dispatch) => {
  try {
    dispatch({ type: test.SINGLE_TESTPAPER_REQUEST });

    const { data } = await http.post("/api/student/questions", { id });

    dispatch({
      type: test.SINGLE_TESTPAPER_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex);

    // dispatch({
    //   type: test.SINGLE_TESTPAPER_FAIL,
    //   payload:
    //     ex.response && ex.response.data.message
    //       ? ex.response.data.message
    //       : ex.message,
    // });
  }
};

export const checkTestStart = async (id) => {
  try {
    const { data } = await http.post("/api/test/check-test-start", { id });
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getTestDetails = async (id) => {
  try {
    const { data } = await http.get(`/api/test/get/${id}`, Token());
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};
export const startTestTime = async (testId) => {
  try {
    const { data } = await http.post("/api/student/test/start-time", {
      testId,
    });
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getTestCategory = async (testId) => {
  try {
    const { data } = await http.post("/api/student/test/category", { testId });
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getTestPdf = async (testId) => {
  try {
    const { data } = await http.post("/api/student/test/pdf", { testId });
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};
