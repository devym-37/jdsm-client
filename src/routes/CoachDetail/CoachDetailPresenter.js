import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../components/Loader";
// import Table from "../../components/Table";
import CoachForm from "../../components/CoachForm";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

const CoachDetailPresenter = ({
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
            handleSubmit={handleSubmit}
          />
        ) : (
          <CoachForm
            coachForm={coachForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
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
        >
          <Column title="이름" dataIndex="name" key="name" />
          <Column title="나이" dataIndex="age" key="age" />
          <Column title="연락처" dataIndex="contact" key="contact" />
        </Table>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Content>
  </>
);

export default CoachDetailPresenter;
