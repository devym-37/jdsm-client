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
import LessonDetailScreen from "../routes/LessonDetail";

export default () => (
  <Router>
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar />
        <Layout className="site-layout">
          <Header />
          <Switch>
            <Route path="/" exact component={DashboardScreen} />
            <Route path="/enroll/lesson" component={LessonScreen} />
            <Route path="/lesson/:day" component={LessonDetailScreen} />
            <Route path="/enroll/user" component={UserScreen} />
            <Route path="/enroll/coach" component={CoachScreen} />
            <Redirect from="*" to="/" />
          </Switch>
          <Footer />
        </Layout>
      </Layout>
    </>
  </Router>
);
