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

const { Column } = Table;
const { Content } = Layout;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

const UserDetailPresenter = ({
  users,
  lessons,
  userForm,
  loading,
  select,
  checkUser,
  handleCheckChange,
  modalVisible,
  handleChange,
  handleSubmit,
  handleSelect,
  handleShowModal,
  handleCancel,
}) => (
  <>
    <Helmet>
      <title>수강생 현황</title>
    </Helmet>
    <Content style={{ margin: "0 auto", width: 700 }}>
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
      {checkUser.length === 0 ? (
        <ButtonContainer>
          <Button type="primary" onClick={handleShowModal}>
            회원 등록
          </Button>
        </ButtonContainer>
      ) : checkUser.length === 1 ? (
        <ButtonContainer>
          <Button
            type="primary"
            onClick={handleShowModal}
            style={{ marginRight: 10 }}
          >
            회원 수정
          </Button>
          <Button
            danger
            onClick={handleShowModal}
            style={{ backgroundColor: "#f5222d", color: "#fff" }}
          >
            회원 삭제
          </Button>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <Button
            danger
            onClick={handleShowModal}
            style={{ backgroundColor: "#f5222d", color: "#fff" }}
          >
            회원 삭제
          </Button>
        </ButtonContainer>
      )}

      <Modal
        visible={modalVisible}
        cancelText="취소"
        okText="등록"
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <MemberForm
          userForm={userForm}
          handleChange={handleChange}
          handleSelect={handleSelect}
          handleSubmit={handleSubmit}
          lessons={lessons}
          select={select}
        />
      </Modal>
      {!loading ? (
        <Loader />
      ) : users.length !== 0 ? (
        <Table
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys, selectedRows) => {
              handleCheckChange(selectedRows);
            },
          }}
          dataSource={users}
          style={{ fontWeight: 600 }}
          pagination={{ pageSize: 8 }}
        >
          <Column title="이름" dataIndex="이름" key="이름" />
          <Column title="학교" dataIndex="학교" key="학교" />
          <Column title="학년" dataIndex="학년" key="학년" />
          <Column title="연락처" dataIndex="연락처" key="연락처" />
        </Table>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Content>
  </>
);

export default UserDetailPresenter;
