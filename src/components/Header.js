import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

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
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item
              key="1"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "#001529",
                color: "#fff",
                cursor: "default",
              }}
            >
              JD Football Academy
            </Menu.Item>
          </Menu>
        </Header>
        {/* <Content style={{ margin: "0 16px" }}>
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
        </Content> */}
      </>
    );
  }
}

export default Headers;
