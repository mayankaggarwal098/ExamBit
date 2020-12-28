import React from 'react';
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Header from './component/Header'
import Register from './screen/Register';
import Login from  './screen/Login'; 
import QuestionList from './screen/QuestionList';
import QuestionCreate from './screen/QuestionCreate';

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Header />
        <ToastContainer />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/questions" component={QuestionList} exact/>
        <Route path="/questions/create" component={QuestionCreate} />
      </header>
    </BrowserRouter>
  );
}

export default App;
