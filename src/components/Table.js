import React from "react";
import { Table, Tag, Space } from "antd";

import styled from "styled-components";

class TableInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }
  componentDidMount() {
    this.handleColumns();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data[0] !== prevProps.data[0]) {
      this.handleColumns();
    }
  }

  handleColumns = () => {
    const { data } = this.props;
    const { columns } = this.state;
    let column = {};

    for (const key in data[0]) {
      console.log("key :>> ", key);
      if (key === "lessonCoach" || key === "student") {
        column = {
          title: `${key}`,
          dataIndex: `${key}`,
          key: `${key}`,
          render: (
            <>
              {data[key].map((tag) => {
                let color = "green";
                return (
                  <Tag color={color} key={tag}>
                    {tag}
                    {"&"}
                  </Tag>
                );
              })}
            </>
          ),
        };
        this.setState({
          columns: columns.push(column),
        });
      } else {
        column = {
          title: `${key}`,
          dataIndex: `${key}`,
          key: `${key} `,
        };
        this.setState({
          columns: columns.push(column),
        });
      }
    }
    this.setState({
      columns: [
        ...columns,
        {
          title: "비고",
          key: "action",
          render: (text, record) => (
            <Space size="middle">
              <a>수정</a>
              <a>삭제</a>
            </Space>
          ),
        },
      ],
    });
  };

  render() {
    const { columns } = this.state;
    const { data } = this.props;
    console.log("this.props 1234:>> ", this.props);
    console.log("columns :>> ", this.state);
    return <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />;
  }
}

export default TableInfo;
