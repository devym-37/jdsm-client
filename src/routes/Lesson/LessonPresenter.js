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

const LessonPresenter = ({
  lessonInfo,
  lessons,
  members,
  coaches,
  days,
  loading,
  select,
  update,
  timePickerOpen,
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
  handlePickerOpen,
}) => (
  <>
    <Helmet>
      <title>레슨 현황</title>
    </Helmet>
    <Content style={{ margin: "0 auto", width: 1100, maxWidth: "100%" }}>
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
            members={members}
            coaches={coaches}
            days={days}
            timePickerOpen={timePickerOpen}
            handleChange={handleChange}
            handleSelect={handleSelect}
            handleTimeChange={handleTimeChange}
            handlePickerOpen={handlePickerOpen}
          />
        ) : (
          <LessonForm
            lessonInfo={lessonInfo}
            members={members}
            coaches={coaches}
            days={days}
            timePickerOpen={timePickerOpen}
            handleChange={handleChange}
            handleSelect={handleSelect}
            handleTimeChange={handleTimeChange}
            handlePickerOpen={handlePickerOpen}
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
          style={{ fontWeight: 600, width: "100%" }}
          pagination={{ pageSize: 8 }}
        >
          <Column
            title="레슨이름"
            dataIndex="name"
            key="name"
            style={{ fontWeight: 500 }}
          />
          <Column
            title="레슨코치"
            dataIndex="coachIds"
            key="coachIds"
            render={(coach) => (
              <>
                <Tag color="#70a1ff" key={"coaches"}>
                  {coach.length} 명
                </Tag>
              </>
            )}
          />
          {console.log("lessons :>> ", lessons)}
          <Column
            title="수강생"
            dataIndex="memberIds"
            key="memberIds"
            render={(student) => (
              <>
                <Tag color="#70a1ff" key={"members"}>
                  {student.length} 명
                </Tag>
              </>
            )}
          />
          <Column
            title="요일"
            dataIndex="schedules"
            key="schedules"
            render={(schedules) => (
              <>
                <Tag color="#70a1ff" key={"schedules.dayOfWeed"}>
                  {schedules[0].dayOfWeed}
                </Tag>
              </>
            )}
          />
          <Column
            title="시작 시간"
            dataIndex="schedules"
            key="schedules"
            render={(schedules) => (
              <>
                <Tag color="#70a1ff" key={"schedules.startTime"}>
                  {schedules[0].startTime}
                </Tag>
              </>
            )}
          />
          <Column
            title="종료 시간"
            dataIndex="schedules"
            key="schedules"
            render={(schedules) => (
              <>
                <Tag color="#70a1ff" key={"schedules.endTime"}>
                  {schedules[0].endTime}
                </Tag>
              </>
            )}
          />
          <Column
            title="레슨비"
            dataIndex="price"
            key="price"
            render={(price) => {
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
            }}
          />
        </Table>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Content>
  </>
);

export default LessonPresenter;
