import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu, Image } from "antd";
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
    console.log("collapsed", collapsed);
    return (
      <Sider
        collapsible collapsed={collapsed}
        onCollapse={onCollapse}
        theme={'light'}
      >
        {collapsed ? (
          <div style={{ marginTop: 20, height: 70, marginBottom: 20 }}></div>
        ) : (
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <img
              src={require("../../assets/Logo.png")}
              alt="Logo"
              height="70"
              style={{ height: 70, width: 300, paddingRight: 100 }}
            />
          </div>
        )}

        <Menu theme="light" mode="inline">
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            <Link to="/dashboard">DashBoard</Link>
          </Menu.Item>
          <SubMenu key="lessonDay" icon={<FileOutlined />} title="레슨 일정">
            {days.map((day, index) => (
              <Menu.Item key={index}>
                <Link to={`/lesson/${day}`}>{day}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
          <Menu.Item key="lessonList" icon={<DesktopOutlined />}>
            <Link to="/lessons">레슨</Link>
          </Menu.Item>
          <Menu.Item key="userList" icon={<TeamOutlined />}>
            <Link to="/members">회원</Link>
          </Menu.Item>
          <Menu.Item key="coachList" icon={<UserOutlined />}>
            <Link to="/coaches">코치</Link>
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
