import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { days } = this.props;
    const { collapsed } = this.state;
    const { onCollapse } = this;

    return (
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div
          style={{
            height: 32,
            background: "#fff",
            margin: 16,
          }}
        >
          로고
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            <Link to="/dashboard">DashBoard</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<FileOutlined />} title="레슨">
            {days.map((day, index) => (
              <Menu.Item key={index}>
                <Link to={`/lesson/${day}`}>{day}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
          <Menu.Item key="레슨" icon={<DesktopOutlined />}>
            <Link to="/enroll/lesson">레슨 등록</Link>
          </Menu.Item>
          <Menu.Item key="회원" icon={<TeamOutlined />}>
            <Link to="/enroll/user">회원 등록</Link>
          </Menu.Item>
          <Menu.Item key="코치" icon={<UserOutlined />}>
            <Link to="/enroll/coach">코치 등록</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    days: state.lessonReducer.days,
  };
};

export default connect(mapStateToProps)(SideBar);
