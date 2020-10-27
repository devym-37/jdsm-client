import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { List } from "antd";

const Container = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const ILink = styled(Link)`
  font-weight: bold;
`;

const DayLessonListCard = ({ data }) => (
  <>
    <Container>
      {console.log("data :>> ", data)}
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 5,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          width: 800,
        }}
        dataSource={data}
        renderItem={(item, index) => {
          return (
            <List.Item key={item.key} style={{ height: 80 }}>
              <List.Item.Meta
                title={
                  <div
                    style={{ fontWeight: "bold" }}
                  >{`이름 : ${item.name}`}</div>
                }
                description={
                  <div style={{ marginBottom: 15 }}>{`연락처 : ${
                    item.contact ? item.contact : "없음"
                  }`}</div>
                }
              />
            </List.Item>
          );
        }}
      />
    </Container>
  </>
);

export default DayLessonListCard;
