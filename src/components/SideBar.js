import React from "react";
import { connect } from "react-redux";

import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
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

const mapStateToProps = (state) => {
  return {
    days: state.lessonReducer.days,
  };
};

export default connect(mapStateToProps)(SideBar);
