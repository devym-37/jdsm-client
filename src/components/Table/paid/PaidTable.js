import React from "react";
import { Table, Button, Space } from "antd";
import Card from './../../Card/Card';

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
      selectedRowKeys: []
    };
  }

  han

  render() {
    const { selectedRowKeys } = this.state;
    const dataSource = [{
      key: 1,
      name: 'JACK',
      dayOfWeek: '월요일',
      lesson: '백문초 91또래',
      date: '20년 5월',
      pay: '70000',
    }];
    return <Card
      title={"미납자 명단"}
      body={<>
        <Space style={styles.buttonContainer}>
          <Button>회비 제출</Button>
        </Space>

        <Table
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedRowKeys,
            // onChange: (selectedRowKeys, selectedRows) => {
            //   handleCheckChange(selectedRowKeys, selectedRows);
            // },
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
