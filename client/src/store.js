import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { registerReducer, userLoginReducer } from "./reducer/userReducer";
import {
  createQuestionReducer,
  questionDeleteReducer,
  questionListReducer,
} from "./reducer/questionReducer";
import {
  testCreateReducer,
  getTestPaperReducer,
  deleteTestPaperReducer,
  testbeginReducer,
  getSingleTestPaperReducer,
  testEndReducer,
  isTestStartReducer,
} from "./reducer/testReducer";
import {
  registrationCloseReducer,
  registrationOpenReducer,
  resultDownloadReducer,
  studentDetailReducer,
  studentRegistrationReducer,
} from "./reducer/studentRegistrationReducer";
import {
  answerSubmissionReducer,
  responseSheetReducer,
} from "./reducer/responseSheetReducer";
import {
  getSupervisorReducer,
  getSupervisorReqReducer,
  removeSupervisorReducer,
  updateSupervisorReducer,
} from "./reducer/supervisorReducer";
import { generateResultReducer } from "./reducer/generateResultReducer";

const reducer = combineReducers({
  register: registerReducer,
  userLogin: userLoginReducer,
  createQuestion: createQuestionReducer,
  questionList: questionListReducer,
  questionDelete: questionDeleteReducer,
  testCreate: testCreateReducer,
  getTestPaper: getTestPaperReducer,
  deleteTestPaper: deleteTestPaperReducer,
  testBegin: testbeginReducer,
  testEnd: testEndReducer,
  singleTestPaper: getSingleTestPaperReducer,
  studentRegister: studentRegistrationReducer,
  studentResponseSheet: responseSheetReducer,
  answerSubmission: answerSubmissionReducer,
  registrationOpen: registrationOpenReducer,
  registrationClose: registrationCloseReducer,
  isTestStart: isTestStartReducer,
  studentDetail: studentDetailReducer,
  generateResult : generateResultReducer ,
  supervisorList: getSupervisorReducer,
  supervisorReqList: getSupervisorReqReducer,
  removeSupervisor: removeSupervisorReducer,
  updateSupervisor: updateSupervisorReducer,
  resultDownload: resultDownloadReducer
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
