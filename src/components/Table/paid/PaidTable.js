import React from "react";
import { Table, Button, Space } from "antd";
import Moment from 'moment';

import Card from './../../Card/Card';
import Columns from './PaidColumns.json';
import dataSource from './PaidSample.json'

class PaidTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      selectedRowKeys: [],
      selectedRows: []
    };
    this.setCheckboxes = this.setCheckboxes.bind();
    this.sendPaid = this.sendPaid.bind();
  }

  setCheckboxes = (selectedRowKeys, selectedRows) => {
    this.setDisabled(selectedRowKeys.length);
    this.setState({
      selectedRows: [...selectedRows],
      selectedRowKeys: [...selectedRowKeys]
    });
  };

  setDisabled = (length) => {
    length === 0 ? this.setState({ disabled: true }) : this.setState({ disabled: false });
  }

  sendPaid = () => {
    const { selectedRows } = this.state;
    const payload = selectedRows.map(row => {
      return {
        "lessonKey": row.lessonKey,
        "paidDate": Moment(new Date()).format('YYYY-MM-DD'),
        "states": {
          "memberKey": row.memberKey,
          "state": "PAID"
        }
      }
    })
    console.log("Payload : ", payload);
  }

  render() {
    const { disabled, selectedRowKeys } = this.state;

    return <Card
      title={"미납자 명단"}
      body={<>
        <Space style={styles.buttonContainer}>
          <Button
            disabled={disabled}
            onClick={() => this.sendPaid()}
          >
            회비 제출
          </Button>
        </Space>

        <Table
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setCheckboxes(selectedRowKeys, selectedRows);
            },
          }}
          bordered={true}
          columns={Columns}
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
