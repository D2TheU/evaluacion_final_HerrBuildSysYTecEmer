import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import style from "./assets/css/bootstrap-4.1.1.min.css";

import App from './components/App/App.jsx';
import NotFound from './components/App/NotFound.jsx';

import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
