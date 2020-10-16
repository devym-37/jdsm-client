import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../components/Loader";
// import Table from "../../components/Table";
import MemberForm from "../../components/MemberForm";

import {
  Layout,
  Breadcrumb,
  Input,
  Select,
  Button,
  Table,
  Empty,
  Modal,
} from "antd";
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

const MemberPresenter = ({
  members,
  lessons,
  memberForm,
  loading,
  select,
  checkMember,
  update,
  handleCheckChange,
  selectedRowKeys,
  modalVisible,
  handleChange,
  handleSubmit,
  handleSelect,
  handleShowModal,
  handleCancel,
  handleDeleteMember,
  handleUpdateMember,
}) => (
  <>
    <Helmet>
      <title>수강생 현황</title>
    </Helmet>
    <Content style={{ margin: "0 auto", width: 850 }}>
      <Breadcrumb style={{ margin: "30px 0 15px 0" }}>
        <Breadcrumb.Item
          style={{
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          [ 회원 현황 ]
        </Breadcrumb.Item>
      </Breadcrumb>
      {checkMember.length === 0 ? (
        <ButtonContainer>
          <Button
            type="primary"
            name="register"
            onClick={(e) => handleShowModal(e)}
          >
            회원 등록
          </Button>
        </ButtonContainer>
      ) : checkMember.length === 1 ? (
        <ButtonContainer>
          <Button
            type="primary"
            name="update"
            onClick={(e) => handleShowModal(e)}
            style={{ marginRight: 10 }}
          >
            회원 수정
          </Button>
          <Button
            danger
            name="delete"
            onClick={(e) => handleDeleteMember(e)}
            style={{ backgroundColor: "#f5222d", color: "#fff" }}
          >
            회원 삭제
          </Button>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <Button
            danger
            name="delete"
            onClick={(e) => handleDeleteMember(e)}
            style={{ backgroundColor: "#f5222d", color: "#fff" }}
          >
            회원 삭제
          </Button>
        </ButtonContainer>
      )}

      <Modal
        visible={modalVisible}
        cancelText="취소"
        okText={update ? "수정" : "등록"}
        onOk={update ? handleUpdateMember : handleSubmit}
        onCancel={handleCancel}
      >
        {update ? (
          <MemberForm
            update={update}
            memberForm={memberForm}
            handleChange={handleChange}
            handleSelect={handleSelect}
            handleSubmit={handleSubmit}
            lessons={lessons}
            select={select}
          />
        ) : (
          <MemberForm
            memberForm={memberForm}
            handleChange={handleChange}
            handleSelect={handleSelect}
            handleSubmit={handleSubmit}
            lessons={lessons}
            select={select}
          />
        )}
      </Modal>
      {!loading ? (
        <Loader />
      ) : members.length !== 0 ? (
        <Table
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              handleCheckChange(selectedRowKeys, selectedRows);
            },
          }}
          dataSource={members}
          style={{ fontWeight: 600 }}
          pagination={{ pageSize: 8 }}
          className={tableCSS}
        >
          <Column title="이름" dataIndex="name" key="name" />
          <Column
            title="보호자 성함"
            dataIndex="parentName"
            key="parentName"
            align="center"
          />
          <Column
            title="보호자 연락처"
            dataIndex="contact"
            key="contact"
            align="center"
          />
          <Column
            title="레슨"
            dataIndex="lesson"
            key="lesson"
            width="200px"
            align="center"
          />
          <Column
            title="등록 일자"
            dataIndex="registrationDate"
            key="registrationDate"
            align="center"
          />
        </Table>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Content>
  </>
);

export default MemberPresenter;
