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
import "./../SideBar/SideBar.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

const menus = [
  {
    key: "dashboard",
    icon: <HomeOutlined />,
    link: "/dashboard",
    title: "대시보드",
  },
  {
    key: "userList",
    icon: <TeamOutlined />,
    link: "/members",
    title: "회원관리",
  },
  {
    key: "coachList",
    icon: <UserOutlined />,
    link: "/coaches",
    title: "코치관리",
  },
  {
    key: "lessonList",
    icon: <DesktopOutlined />,
    link: "/lessons",
    title: "레슨관리",
  },
];

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      mode: "inline",
      theme: "light",
      selected: 'dashboard'
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

  renderMenus = () => {
    return menus.map((menu) => {
      return (
        <Menu.Item key={menu.key} icon={menu.icon}>
          <Link to={menu.link}>{menu.title}</Link>
        </Menu.Item>
      );
    });
  };

  render() {
    const { days } = this.props;
    const { collapsed, theme, mode, selected } = this.state;
    const { onCollapse, renderMenus, renderCollapsedLogo, rednerLogo } = this;

    return (
      <Sider
        style={styles.sider}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        theme={theme}
      >
        {collapsed ? renderCollapsedLogo() : rednerLogo()}

        <Menu 
          className={SideBar}
          defaultSelectedKeys={[selected]}
          theme={theme} 
          mode={mode}>
          {renderMenus()}
          <SubMenu key="lessonDay" icon={<FileOutlined />} title="레슨 일정">
            {days.map((day, index) => (
              <Menu.Item key={index}>
                <Link to={`/lesson/${day}`}>{day}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

const styles = {
  sider: {
    boxShadow: "0 0.15rem 1.75rem 0 rgba(31, 45, 65, 0.15)",
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
