import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { registerReducer, urlPathReducer, userLoginReducer } from "./reducer/userReducer";
import {
  // createQuestionReducer,
  // questionDeleteReducer,
  questionListReducer
} from "./reducer/questionReducer";
import {
  // testCreateReducer,
  getTestPaperReducer,
  // deleteTestPaperReducer,
  // testbeginReducer,
  getSingleTestPaperReducer,
  // testEndReducer,
} from "./reducer/testReducer";
import {
  registeredStudentListReducer,
  // registrationCloseReducer,
  // registrationOpenReducer,
  // resultDownloadReducer,
  studentDetailReducer,
  studentTestListReducer
  // studentRegistrationReducer,
} from "./reducer/studentRegistrationReducer";
import {
  // answerSubmissionReducer,
  // responseSheetReducer,
} from "./reducer/responseSheetReducer";
import {
  getSupervisorReducer,
  getSupervisorReqReducer,
  // removeSupervisorReducer,
  updateSupervisorReducer,
} from "./reducer/supervisorReducer";
import { generateResultReducer } from "./reducer/generateResultReducer";
import { groupListReducer } from "./reducer/groupReducer";

const reducer = combineReducers({
  // register: registerReducer,
  userLogin: userLoginReducer,
  urlPath: urlPathReducer,
  // createQuestion: createQuestionReducer,
  questionList: questionListReducer,
  // questionDelete: questionDeleteReducer,
  // testCreate: testCreateReducer,
  getTestPaper: getTestPaperReducer,
  // deleteTestPaper: deleteTestPaperReducer,
  // testBegin: testbeginReducer,
  // testEnd: testEndReducer,
  singleTestPaper: getSingleTestPaperReducer,
  // studentRegister: studentRegistrationReducer,
  // studentResponseSheet: responseSheetReducer,
  // answerSubmission: answerSubmissionReducer,
  // registrationOpen: registrationOpenReducer,
  // registrationClose: registrationCloseReducer,
  registeredStudentList: registeredStudentListReducer,
  studentDetail: studentDetailReducer,
  generateResult : generateResultReducer ,
  supervisorList: getSupervisorReducer,
  supervisorReqList: getSupervisorReqReducer,
  // removeSupervisor: removeSupervisorReducer,
  updateSupervisor: updateSupervisorReducer,
  groupList: groupListReducer,
  studentTestList: studentTestListReducer
  // resultDownload: resultDownloadReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
