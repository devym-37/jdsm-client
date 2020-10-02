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
            {/* <Route path="/lessons/:day" component={LessonDetailScreen} /> */}
            <Route path="/coaches" component={CoachScreen} />
            <Route path="/members" component={MemberScreen} />
            <Route path="/lessons" component={LessonScreen} />
            <Redirect from="*" to="/" />
          </Switch>
          <Footer />
        </Layout>
      </Layout>
    </>
  </Router>
);
