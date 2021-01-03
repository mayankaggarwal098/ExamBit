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
