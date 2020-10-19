import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../components/Loader";
// import Table from "../../components/Table";
import CoachForm from "../../components/CoachForm";

import { Layout, Breadcrumb, Select, Button, Table, Empty, Modal } from "antd";
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

const CoachPresenter = ({
  coachForm,
  coaches,
  loading,
  select,
  update,
  checkCoach,
  modalVisible,
  selectedRowKeys,
  handleCheckChange,
  handleChange,
  handleSubmit,
  handleShowModal,
  handleCancel,
  handleDeleteCoach,
  handleUpdateCoach,
  handleDateChange,
}) => (
  <>
    <Helmet>
      <title>코치 현황</title>
    </Helmet>

    <Content style={{ margin: "0 auto", width: 700 }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item
          style={{
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          [ 코치 현황 ]
        </Breadcrumb.Item>
      </Breadcrumb>

      {checkCoach.length === 0 ? (
        <ButtonContainer>
          <Button type="primary" onClick={handleShowModal}>
            코치 등록
          </Button>
        </ButtonContainer>
      ) : checkCoach.length === 1 ? (
        <ButtonContainer>
          <Button
            type="primary"
            onClick={handleShowModal}
            style={{ marginRight: 10 }}
          >
            코치 수정
          </Button>
          <Button
            danger
            onClick={(e) => handleDeleteCoach(e)}
            style={{ backgroundColor: "#f5222d", color: "#fff" }}
          >
            코치 삭제
          </Button>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <Button
            danger
            onClick={(e) => handleDeleteCoach(e)}
            style={{ backgroundColor: "#f5222d", color: "#fff" }}
          >
            코치 삭제
          </Button>
        </ButtonContainer>
      )}

      <Modal
        visible={modalVisible}
        cancelText="취소"
        okText={update ? "수정" : "등록"}
        onOk={update ? handleUpdateCoach : handleSubmit}
        onCancel={handleCancel}
      >
        {update ? (
          <CoachForm
            update={update}
            coachForm={coachForm}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
          />
        ) : (
          <CoachForm
            coachForm={coachForm}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
          />
        )}
      </Modal>

      {!loading ? (
        <Loader />
      ) : coaches.length !== 0 ? (
        <Table
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              handleCheckChange(selectedRowKeys, selectedRows);
            },
          }}
          dataSource={coaches}
          style={{ fontWeight: 600 }}
          pagination={{ pageSize: 8 }}
          className={tableCSS}
        >
          <Column title="이름" dataIndex="name" key="name" />
          <Column
            title="생년월일"
            dataIndex="birthday"
            key="birthday"
            align="center"
          />
          <Column
            title="연락처"
            dataIndex="contact"
            key="contact"
            align="center"
          />
        </Table>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Content>
  </>
);

export default CoachPresenter;
