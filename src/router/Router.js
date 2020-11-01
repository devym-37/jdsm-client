import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Layout } from "antd";
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InnerHeader from "../components/Header/InnerHeader";

import DashboardScreen from "../routes/Dashboard";

import CoachScreen from "../routes/Coach";
import MemberScreen from "../routes/Member";
import LessonScreen from "../routes/Lesson";
import styled from "styled-components";

const Container = styled.div`
  margin-top: -6rem;
`;

export default () => (
  <Router>
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar />
        <Layout className="site-layout">
          <Header />
          <InnerHeader />
          <Container>
            <Switch>
              <Route path="/" exact component={DashboardScreen} />
              {/* <Route path="/lessons/:day" component={LessonDetailScreen} /> */}
              <Route path="/coaches" component={CoachScreen} />
              <Route path="/members" component={MemberScreen} />
              <Route path="/lessons" component={LessonScreen} />
              <Redirect from="*" to="/" />
            </Switch>
          </Container>
          <Footer />
        </Layout>
      </Layout>
    </>
  </Router>
);
