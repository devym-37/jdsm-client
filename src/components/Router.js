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
import DayLessonScreen from "../routes/DayLesson";
import CoachScreen from "../routes/Coach";
import MemberScreen from "../routes/Member";
import LessonScreen from "../routes/Lesson";

export default () => (
  <Router>
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar />
        <Layout className="site-layout">
          <Header />
          <Switch>
            <Route path="/" exact component={DashboardScreen} />
            <Route path="/coach" component={CoachScreen} />
            <Route path="/member" component={MemberScreen} />
            <Route path="/lesson" component={LessonScreen} />
            <Route path={`/lessons/:day`} component={DayLessonScreen} />
            <Redirect from="*" to="/" />
          </Switch>
          <Footer />
        </Layout>
      </Layout>
    </>
  </Router>
);
