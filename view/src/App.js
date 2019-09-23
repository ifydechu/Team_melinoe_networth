import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/login";
import Register from "./pages/Login/login";

import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
}

export default App;
