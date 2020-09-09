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
        <Menu theme="dark" mode="inline">
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
            <Link to="/users">회원</Link>
          </Menu.Item>
          <Menu.Item key="coachList" icon={<UserOutlined />}>
            <Link to="/coaches">코치</Link>
          </Menu.Item>
          <SubMenu key="lesson" icon={<DesktopOutlined />} title="레슨">
            <Menu.Item key="lessonList" icon={<DesktopOutlined />}>
              <Link to="/lesson/list">레슨 현황</Link>
            </Menu.Item>
            <Menu.Item key="enrollLesson" icon={<DesktopOutlined />}>
              <Link to="/enroll/lesson">레슨 등록</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="coach" icon={<UserOutlined />} title="코치">
            <Menu.Item key="coachList" icon={<UserOutlined />}>
              <Link to="/coach/list">코치 현황</Link>
            </Menu.Item>
            <Menu.Item key="enrollCoach" icon={<UserOutlined />}>
              <Link to="/enroll/coach">코치 등록</Link>
            </Menu.Item>
          </SubMenu>
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
