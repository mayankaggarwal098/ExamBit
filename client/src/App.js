import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './component/Header'
import Register from './component/Register';
import Login from  './component/Login'; 

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Header />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </header>
    </BrowserRouter>
  );
}

export default App;
