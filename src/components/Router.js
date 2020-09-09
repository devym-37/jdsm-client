import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Layout } from "antd";
import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";

import DashboardScreen from "../routes/Dashboard";
import CoachScreen from "../routes/Coach";
import LessonScreen from "../routes/Lesson";

import CoachDetailScreen from "../routes/CoachDetail";
import UserDetailScreen from "../routes/UserDetail";
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
            {/* <Route path="/lessons/:day" component={LessonDetailScreen} /> */}
            <Route path="/enroll/coach" component={CoachScreen} />
            <Route path="/coaches" component={CoachDetailScreen} />
            <Route path="/users" component={UserDetailScreen} />
            <Route path="/lessons" component={LessonDetailScreen} />
            <Redirect from="*" to="/" />
          </Switch>
          <Footer />
        </Layout>
      </Layout>
    </>
  </Router>
);
