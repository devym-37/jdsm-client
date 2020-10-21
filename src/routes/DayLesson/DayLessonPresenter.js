import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../components/Loader";
// import Table from "../../components/Table";
import LessonForm from "../../components/LessonForm";

import { Layout, Breadcrumb, Button, Table, Tag, Empty, Modal } from "antd";
import { css } from "emotion";

const { Column } = Table;
const { Content } = Layout;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

const tableCSS = css({
  "& thead > tr > th": {
    fontWeight: "bold",
  },
});

const DayLessonPresenter = ({
  lessonInfo,
  lessons,
  members,
  coaches,
  days,
  loading,
  select,
  dayOfKor,
  update,
  selectDay,
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
      <title>{`${selectDay} 레슨`}</title>
    </Helmet>
    <Content style={{ margin: "0 auto", width: 1100, maxWidth: "100%" }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item
          style={{
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          {`[ ${selectDay} 레슨 ]`}
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
          className={tableCSS}
          style={{ fontWeight: 600, width: "100%" }}
          pagination={{ pageSize: 8 }}
        >
          <Column title="레슨이름" dataIndex="name" key="name" />
          {/* <Column
            title="레슨코치"
            dataIndex="coaches"
            key="coaches"
            render={(coach) => (
              <>
                <Tag color="#70a1ff" key={"coaches"}>
                  {coach.length} 명
                </Tag>
              </>
            )}
            align="center"
          /> */}
          {/* <Column
            title="수강생"
            dataIndex="members"
            key="members"
            render={(student) => (
              <>
                <Tag color="#70a1ff" key={"members"}>
                  {student.length} 명
                </Tag>
              </>
            )}
            align="center"
          /> */}
          <Column
            title="요일"
            dataIndex="schedules"
            key="schedules"
            render={(schedules) => (
              <>
                <Tag color="#70a1ff" key={"schedules.dayOfWeek"}>
                  {dayOfKor[schedules[0].dayOfWeek]}
                </Tag>
              </>
            )}
            align="center"
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
            align="center"
          />
          <Column
            title="종료 시간"
            dataIndex="schedules"
            key="schedules"
            fontWeight="bold"
            render={(schedules) => (
              <>
                <Tag color="#70a1ff" key={"schedules.endTime"}>
                  {schedules[0].endTime}
                </Tag>
              </>
            )}
            align="center"
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
            align="center"
          />
        </Table>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Content>
  </>
);

export default DayLessonPresenter;
