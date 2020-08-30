import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";

import DashboardScreen from "../routes/Dashboard";
import CoachScreen from "../routes/Coach";
import LessonScreen from "../routes/Lesson";
import UserScreen from "../routes/User";

export default () => (
  <Router>
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar />
        <Layout className="site-layout">
          <Header />
          <Footer />
        </Layout>
        <Switch>
          <Route path="/" exact component={DashboardScreen} />
          <Route path="/lesson" component={LessonScreen} />
          <Route path="/user" component={UserScreen} />
          <Route path="/coach" component={CoachScreen} />
          <Redirect from="*" to="/" />
        </Switch>
      </Layout>
    </>
  </Router>
);
