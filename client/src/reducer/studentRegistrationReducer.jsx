import * as student_reg from '../constants/studentRegistrationConstant';

export const studentRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case student_reg.STUDENT_REGISTRATION_REQUEST:
      return { loading: true, success: false };
    case student_reg.STUDENT_REGISTRATION_SUCCESS:
      return { loading: false, success: true };
    case student_reg.STUDENT_REGISTRATION_FAIL:
      return { loading: false };
    default:
      return state;
  }
};

export const registrationOpenReducer = (state = {}, action) => {
  switch (action.type) {
    case student_reg.REGISTRATION_OPEN_SUCCESS:
      return { success: true };
    case student_reg.REGISTRATION_OPEN_FAIL:
      return { success: false };
    default:
      return state;
  }
};

export const registrationCloseReducer = (state = {}, action) => {
  switch (action.type) {
    case student_reg.REGISTRATION_OPEN_SUCCESS:
      return { success: true };
    case student_reg.REGISTRATION_OPEN_FAIL:
      return { success: false };
    default:
      return state;
  }
};

export const studentDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case student_reg.STUDENT_DETAIL_REQUEST:
      return { loading: true };
    case student_reg.STUDENT_DETAIL_SUCCESS:
      return { loading: false, success: true, student: action.payload };
    case student_reg.STUDENT_DETAIL_FAIL:
      return { success: false, error: action.payload };
    default:
      return state;
  }
};

export const resultDownloadReducer = (state = {}, action) => {
  switch (action.type) {
    case student_reg.RESULT_DOWNLOAD_REQUEST:
      return { loading: true };
    case student_reg.RESULT_DOWNLOAD_SUCCESS:
      return { loading: false, success: true };
    case student_reg.RESULT_DOWNLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
