import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Header from "./Header";

export default () => (
  <Router>
    <>
      <Header />
      {/* <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/detail/:company/:invoice" component={Detail} />
        <Redirect from="*" to="/" />
      </Switch> */}
    </>
  </Router>
);
