import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/Header";
import Register from "./screen/Register";
import Login from "./screen/Login";
import QuestionList from "./screen/QuestionList";
import QuestionCreate from "./screen/QuestionCreate";
import TestCreate from "./screen/TestCreate";
import StudentRegistered from "./screen/StudentRegistered";
import TestPaper from "./screen/TestPaper";
import Instruction from "./component/Instruction";
import SupervisorList from "./screen/SupervisorList";
import SupervisorReqList from "./screen/SupervisorReqList";
import StudentResult from "./screen/StudentResult";
import EmailNotification from "./screen/EmailNotification";
import Snapshots from "./screen/Snapshots";
import HomeScreen from "./screen/HomeScreen";
import TestConductedList from "./screen/TestConductedList";
import TestNotConductedList from "./screen/TestNotConductedList";
import GivenTest from './screen/GivenTest'
import Audio from "./screen/Audio";
import Profile from "./screen/Profile";
import SupervisorGroup from "./screen/SupervisorGroup";
import StudentGroup from './screen/StudentGroup';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer autoClose={2000} />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile}  />
        <Route path="/" component={HomeScreen} exact />
        <Route path="/questions" component={QuestionList} exact />
        <Route path="/pastTest" component={GivenTest}  />
        <Route path="/supervisor/groups" component={SupervisorGroup}  />
        <Route path="/student/groups" component={StudentGroup}  />
        
        
        <Route path="/questions/create" component={QuestionCreate} />
        <Route path="/tests/create" component={TestCreate} />
        <Route path="/tests/edit/:testId" component={TestCreate} />
        <Route
          path="/tests/notConducted"
          component={TestNotConductedList}
          exact
        />
        <Route path="/tests/conducted" component={TestConductedList} exact />
        <Route
          path="/student/registration/test/:id/emailsent"
          component={EmailNotification}
        />
        <Route
          path="/student/registration/test/:id"
          component={StudentRegistered}
        />
        <Route path="/student/test/result" component={StudentResult} />
        <Route path="/student/test/start" component={TestPaper} />
        <Route path="/student/test/snapshots" component={Snapshots} />
        <Route path="/student/test/audio" component={Audio} />
        <Route path="/student/test" component={Instruction} exact />
        <Route path="/supervisor/request" component={SupervisorReqList} />
        <Route path="/supervisor" component={SupervisorList} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
