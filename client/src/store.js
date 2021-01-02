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
} from "./reducer/testReducer";

const reducer = combineReducers({
  register: registerReducer,
  userLogin: userLoginReducer,
  createQuestion: createQuestionReducer,
  questionList: questionListReducer,
  questionDelete: questionDeleteReducer,
  testCreate: testCreateReducer,
  getTestPaper: getTestPaperReducer,
  deleteTestPaper: deleteTestPaperReducer,
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
