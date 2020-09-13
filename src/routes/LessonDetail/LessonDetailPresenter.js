import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../components/Loader";
// import Table from "../../components/Table";
import LessonForm from "../../components/LessonForm";

import {
  Layout,
  Breadcrumb,
  Input,
  Select,
  Button,
  Table,
  Tag,
  Space,
  Empty,
  Modal,
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
  justify-content: flex-end;
  margin-bottom: 15px;
`;

const IButton = styled(Button)``;

const LessonDetailPresenter = ({
  lessonInfo,
  lessons,
  users,
  coaches,
  days,
  loading,
  select,
  update,
  checkLesson,
  modalVisible,
  handleChange,
  handleSelect,
  handleSubmit,
  handleTimeChange,
  handleShowModal,
  handleCancel,
  handleCheckChange,
  handleDeleteLesson,
  handleUpdateLesson,
  selectedRowKeys,
}) => (
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

      {checkLesson.length === 0 ? (
        <ButtonContainer>
          <Button type="primary" onClick={handleShowModal}>
            레슨 등록
          </Button>
        </ButtonContainer>
      ) : checkLesson.length === 1 ? (
        <ButtonContainer>
          <Button
            type="primary"
            onClick={handleShowModal}
            style={{ marginRight: 10 }}
          >
            레슨 수정
          </Button>
          <Button
            danger
            onClick={(e) => handleDeleteLesson(e)}
            style={{ backgroundColor: "#f5222d", color: "#fff" }}
          >
            레슨 삭제
          </Button>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <Button
            danger
            onClick={(e) => handleDeleteLesson(e)}
            style={{ backgroundColor: "#f5222d", color: "#fff" }}
          >
            레슨 삭제
          </Button>
        </ButtonContainer>
      )}

      <Modal
        visible={modalVisible}
        cancelText="취소"
        okText={update ? "수정" : "등록"}
        onOk={update ? handleUpdateLesson : handleSubmit}
        onCancel={handleCancel}
      >
        {update ? (
          <LessonForm
            lessonInfo={lessonInfo}
            users={users}
            coaches={coaches}
            days={days}
            handleChange={handleChange}
            handleSelect={handleSelect}
            handleTimeChange={handleTimeChange}
          />
        ) : (
          <LessonForm
            lessonInfo={lessonInfo}
            users={users}
            coaches={coaches}
            days={days}
            handleChange={handleChange}
            handleSelect={handleSelect}
            handleTimeChange={handleTimeChange}
          />
        )}
      </Modal>

      {!loading ? (
        <Loader />
      ) : lessons.length !== 0 ? (
        <Table
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              handleCheckChange(selectedRowKeys, selectedRows);
            },
          }}
          dataSource={lessons}
          style={{ fontWeight: 600 }}
          pagination={{ pageSize: 8 }}
        >
          <Column title="레슨이름" dataIndex="lessonName" key="lessonName" />
          <Column title="레슨코치" dataIndex="lessonCoach" key="lessonCoach" />
          <Column
            title="수강생"
            dataIndex="student"
            key="student"
            render={(student) => (
              <>
                <Tag color="#70a1ff" key={"student"}>
                  {student.length} 명
                </Tag>
              </>
            )}
          />
          <Column title="학교" dataIndex="school" key="school" />
          <Column title="학년" dataIndex="grade" key="grage" />
          <Column title="요일" dataIndex="day" key="day" />
          <Column title="시간" dataIndex="time" key="time" />
          <Column title="레슨비" dataIndex="pay" key="pay" />
        </Table>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Content>
  </>
);

export default LessonDetailPresenter;
