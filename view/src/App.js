import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Calculator from './pages/calculatorPage';

import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/calculator" component={Calculator} />
    </Switch>
  );
}

export default App;
