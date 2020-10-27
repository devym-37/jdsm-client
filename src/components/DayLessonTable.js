import React from "react";
import { Table, Badge, Radio, Dropdown, Space, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { css } from "emotion";
import DayLessonListCard from "./DayLessonListCard";

const tableCSS = css({
  "& thead > tr > th": {
    fontWeight: "bold",
  },
});

const DayLessonTable = ({ outTable, innerTable, handleChange }) => {
  const columns = [
    { title: "레슨이름", dataIndex: "name", key: "name" },
    {
      title: "시작 시간",
      dataIndex: "schedules",
      key: "schedules",
      render: (schedules) => (
        <>
          <Tag color="#70a1ff" key={"schedules.startTime"}>
            {schedules[0].startTime.slice(0, 5)}
          </Tag>
        </>
      ),
      align: "center",
    },
    {
      title: "종료 시간",
      dataIndex: "schedules",
      key: "schedules",
      render: (schedules) => (
        <>
          <Tag color="#70a1ff" key={"schedules.endTime"}>
            {schedules[0].endTime.slice(0, 5)}
          </Tag>
        </>
      ),
      align: "center",
    },
    {
      title: "레슨비",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        let value = price
          .toString()
          .replace(/\D/g, "")
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return (
          <>
            <Tag key={"price"}>{`${value} 원`}</Tag>
          </>
        );
      },
      align: "center",
    },
  ];

  return (
    <Table
      className={tableCSS}
      style={{ fontWeight: 600, width: "100%" }}
      pagination={{ pageSize: 8 }}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <DayLessonListCard data={record.members} />
        ),
      }}
      dataSource={outTable}
    />
  );
};

export default DayLessonTable;
