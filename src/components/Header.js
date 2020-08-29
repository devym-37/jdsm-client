import React from "react";
import styled from "styled-components";

import SideBar from "./SideBar";
// import { Helmet } from "react-helmet";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Head = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  z-index: 10;
`;

const Container = styled.div`
  width: 100%;
  align-content: center;
  text-align: center;
`;

const Span = styled.span`
  font-size: 20px;
  width: 500px;
  display: table;
  margin-left: auto;
  margin-right: auto;
`;

const Img = styled.img`
  src: url(${(props) => props.src});
  width: 80px;
  height: 80px;
  alt: "delivery";
`;

class Headers extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <>
        <Layout style={{ minHeight: "100vh" }}>
          <SideBar />
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                Bill is a cat.
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default Headers;
