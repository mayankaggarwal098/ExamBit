import React from 'react';
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './component/Header'
import Register from './screen/Register';
import Login from  './screen/Login'; 
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Header />
        <ToastContainer />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </header>
    </BrowserRouter>
  );
}

export default App;
