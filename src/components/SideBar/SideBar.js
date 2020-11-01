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
      theme: "light",
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  rednerLogo = () => {
    return (
      <div style={styles.logo}>
        <a href="/" style={styles.title}>
          JD Academy
        </a>
      </div>
    );
  };

  renderCollapsedLogo = () => {
    return (
      <div style={styles.collapsedLogo}>
        <a href="/" style={styles.collapsedTitle}>
          JD
        </a>
      </div>
    );
  };

  render() {
    const { days } = this.props;
    const { collapsed, theme } = this.state;
    const { onCollapse } = this;

    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={styles.sidebar}
        theme={theme}
      >
        {collapsed ? this.renderCollapsedLogo() : this.rednerLogo()}

        <Menu theme={theme} mode="inline">
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

const styles = {
  sidebar: {
    boxShadow: "0 0.15rem 1.75rem 0 rgba(31, 45, 65, 0.15) !important",
  },
  logo: {
    marginTop: 20,
    marginBottom: 20,
  },
  collapsedLogo: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#323f52",
    padding: "24px",
  },
  collapsedTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#323f52",
    display: "flex",
    justifyContent: "center",
  },
};
const mapStateToProps = (state) => {
  return {
    days: state.lessonReducer.days,
  };
};

export default connect(mapStateToProps)(SideBar);
