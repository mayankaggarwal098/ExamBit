import * as test from '../constants/testConstant';

export const testCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case test.TEST_CREATE_REQUEST:
      return { loading: true };
    case test.TEST_CREATE_SUCCESS:
      return { loading: false, success: true };
    case test.TEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTestPaperReducer = (state = {}, action) => {
  switch (action.type) {
    case test.TEST_LIST_REQUEST:
      return { loading: true };
    case test.TEST_LIST_SUCCESS:
      return { loading: false, testPapers: action.payload };
    case test.TEST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSingleTestPaperReducer = (state = {}, action) => {
  switch (action.type) {
    case test.SINGLE_TESTPAPER_REQUEST:
      return { loading: true };
    case test.SINGLE_TESTPAPER_SUCCESS:
      return { loading: false, success: true, paper: action.payload };
    case test.SINGLE_TESTPAPER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteTestPaperReducer = (state = {}, action) => {
  switch (action.type) {
    case test.TEST_DELETE_REQUEST:
      return { loading: true };
    case test.TEST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case test.TEST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testbeginReducer = (state = {}, action) => {
  switch (action.type) {
    case test.TEST_BEGIN_REQUEST:
      return { loading: true };
    case test.TEST_BEGIN_SUCCESS:
      return { loading: false, success: true };
    case test.TEST_BEGIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
