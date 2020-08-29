import React from "react";
import styled from "styled-components";

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

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      days: [
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
        "일요일",
      ],
    };
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed, days } = this.state;
    const { onCollapse } = this;
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div
          style={{
            height: 32,
            background: "red",
            margin: 16,
          }}
        />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu key="sub1" icon={<FileOutlined />} title="레슨">
            {days.map((day, index) => (
              <Menu.Item key={index}>{day}</Menu.Item>
            ))}
          </SubMenu>
          <Menu.Item key="레슨" icon={<DesktopOutlined />}>
            레슨 등록
          </Menu.Item>
          <Menu.Item key="회원" icon={<TeamOutlined />}>
            회원 등록
          </Menu.Item>
          <Menu.Item key="코치" icon={<UserOutlined />}>
            코치 등록
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
