import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../components/Loader";
// import Table from "../../components/Table";

import {
  Layout,
  Breadcrumb,
  Input,
  Select,
  Button,
  Table,
  Tag,
  Space,
} from "antd";

const { Column } = Table;
const { Content } = Layout;
const { Option } = Select;

const Container = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

const Div = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-right: 30px;
  width: 100px;
`;

const Inputs = styled(Input)`
  width: 300px;
  height: 40px;
  padding: 15px 150px 18px 17px;
  line-height: 17px;
  font-size: 14px;
  color: #9b9b9b;
  border: none;
  border-radius: 0.4rem;
  transition: box-shadow 300ms;
`;

const Selects = styled(Select)`
  width: 300px;
  font-size: 14px;
  color: #9b9b9b;
  border: none;
  border-radius: 0.4rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 500px;
  justify-content: flex-end;
  margin-top: 15px;
`;

const IButton = styled(Button)``;

const LessonDetailPresenter = ({ lessons }) => (
  <>
    <Helmet>
      <title>레슨 현황</title>
    </Helmet>
    <Content style={{ margin: "0 auto", width: 1100 }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item
          style={{
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          [ 레슨 현황 ]
        </Breadcrumb.Item>
      </Breadcrumb>

      {lessons === undefined ? (
        <Loader />
      ) : (
        <Table
          dataSource={lessons}
          style={{ fontWeight: 600 }}
          pagination={{ pageSize: 8 }}
        >
          <Column title="레슨이름" dataIndex="레슨이름" key="레슨이름" />
          <Column title="레슨코치" dataIndex="레슨코치" key="레슨코치" />
          <Column
            title="수강생"
            dataIndex="수강생"
            key="수강생"
            render={(student) => (
              <>
                <Tag color="#70a1ff" key={"수강생"}>
                  {student.length} 명
                </Tag>
                {/* {student.map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))} */}
              </>
            )}
          />
          <Column title="학교" dataIndex="학교" key="학교" />
          <Column title="학년" dataIndex="학년" key="학년" />
          <Column title="요일" dataIndex="요일" key="요일" />
          <Column title="시간" dataIndex="시간" key="시간" />
          <Column title="레슨비" dataIndex="레슨비" key="레슨비" />
          <Column
            title="수정"
            key="수정"
            render={(text, record) => (
              <Space size="middle">
                {console.log("text", text)}
                <a style={{ color: "#70a1ff" }}>수정</a>
                <a style={{ color: "#ff6b81" }}>삭제</a>
              </Space>
            )}
          />
        </Table>
      )}
    </Content>
  </>
);

export default LessonDetailPresenter;
