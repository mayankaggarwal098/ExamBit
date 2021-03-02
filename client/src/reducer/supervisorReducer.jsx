import * as s from '../constants/supervisorConstant';

export const getSupervisorReducer = (state = {}, action) => {
  switch (action.type) {
    case s.SUPERVISOR_LIST_REQUEST:
      return { loading: true };
    case s.SUPERVISOR_LIST_SUCCESS:
      return { loading: false, supervisors: action.payload };
    case s.SUPERVISOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSupervisorReqReducer = (state = {}, action) => {
  switch (action.type) {
    case s.SUPERVISOR_REQ_LIST_REQUEST:
      return { loading: true };
    case s.SUPERVISOR_REQ_LIST_SUCCESS:
      return { loading: false, supervisors: action.payload };
    case s.SUPERVISOR_REQ_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSupervisorReducer = (state = {}, action) => {
  switch (action.type) {
    case s.SUPERVISOR_UPDATEPERM_REQUEST:
      return { loading: true };
    case s.SUPERVISOR_UPDATEPERM_SUCCESS:
      return { loading: false, supervisors: action.payload };
    case s.SUPERVISOR_UPDATEPERM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
