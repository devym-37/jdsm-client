import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

class Headers extends React.Component {
  state = {
    collapsed: false,
    title: "JD Football Academy",
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { title } = this.state;
    return (
      <>
        <Header className="site-layout-background" style={styles.header}>
          <span style={styles.title}>{title}</span>
        </Header>
      </>
    );
  }
}

const styles = {
  header: {
    height: "3.625rem",
    padding: 0,
    backgroundColor: "#fff",
  },
  title: {
    display: "flex",
    justifyContent: "flex-end",
    cursor: "default",
    height: "inherit",
    fontWeight: "bold",
    paddingRight: "1rem",
  },
};

export default Headers;
