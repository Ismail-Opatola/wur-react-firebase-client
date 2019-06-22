import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';

// components
import Nav from './components/layout/nav';

// pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import User from './pages/user';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Nav />
        <Switch>
          <Route exact path to='/' component={Home} /> 
          <Route exact path to='/login' component={Login} /> 
          <Route exact path to='/signup' component={Signup} /> 
          <Route exact path to='/user/:userId' component={User} /> 
          <Route exact path to='/user/:userId/question/:questionId' component={User} /> 
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
