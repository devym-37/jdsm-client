import React from "react";
import { Table, Button, Space } from "antd";
import Card from './../../Card/Card';
import dataSource from './PaidSample.json'

const columns = [{
  key: 'name',
  title: '이름',
  dataIndex: 'name',
  fixed: 'left',
},
{
  key: 'dayOfWeek',
  title: '레슨 요일',
  dataIndex: 'dayOfWeek',
},
{
  key: 'age',
  title: '레슨 이름',
  dataIndex: 'lesson',
},
{
  key: 'date',
  title: '미납 날짜',
  dataIndex: 'date',
},
{
  key: 'pay',
  title: '미납 금액',
  dataIndex: 'pay'
}]

class PaidTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      selectedRowKeys: []
    };
    this.handleCheckChange = this.handleCheckChange.bind();
  }


  handleCheckChange = (selectedRowKeys, selectedRows) => {
    console.log("========================");
    console.log("SelectedRowKeys : ", selectedRowKeys);
    console.log("SelectedRow : ", selectedRows);

    this.setDisabled(selectedRowKeys.length);
    this.setState({
      selectedRowKeys: [...selectedRowKeys]
    });
  };

  setDisabled = (length) => {
    length === 0 ? this.setState({ disabled: true }) : this.setState({ disabled: false });
  }

  render() {
    const { disabled, selectedRowKeys } = this.state;

    return <Card
      title={"미납자 명단"}
      body={<>
        <Space style={styles.buttonContainer}>
          <Button disabled={disabled}>회비 제출</Button>
        </Space>

        <Table
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.handleCheckChange(selectedRowKeys, selectedRows);
            },
          }}
          bordered={true}
          columns={columns}
          dataSource={dataSource} />
      </>}
    />
  }
}

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '5px'
  },
}

export default PaidTable;
