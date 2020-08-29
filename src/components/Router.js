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
export default () => (
  <Router>
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar />
        <Layout className="site-layout">
          <Header />
          <Footer />
        </Layout>
        {/* <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/detail/:company/:invoice" component={Detail} />
        <Redirect from="*" to="/" />
      </Switch> */}
      </Layout>
    </>
  </Router>
);
