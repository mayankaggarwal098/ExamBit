import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './component/Header'
import TeacherRegister from './component/TeacherRegister';

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Header />
        <Route path="/register/teacher" component={TeacherRegister} />
        <Route path="/register/student" />
      </header>
    </BrowserRouter>
  );
}

export default App;
