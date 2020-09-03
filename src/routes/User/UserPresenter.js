import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import { Layout, Breadcrumb, Input, Select, Button } from "antd";

const { Content } = Layout;
const { Option } = Select;

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  padding: 18px;
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

const IButton = styled(Button)`
  border-radius: 0.4rem;
`;

const UserPresenter = ({
  userForm,
  handleChange,
  handleSelect,
  handleSubmit,
  lessons,
  select,
}) => (
  <>
    <Helmet>
      <title>회원 등록</title>
    </Helmet>

    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginLeft: "30px",
          }}
        >
          회원 등록
        </Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <Div>이름</Div>
        <Inputs
          placeholder="내용을 입력해주세요"
          name="name"
          value={userForm.name}
          onChange={(e) => handleChange(e)}
        />
      </Container>
      <Container>
        <Div>학교</Div>
        <Inputs
          placeholder="내용을 입력해주세요"
          name="school"
          value={userForm.school}
          onChange={(e) => handleChange(e)}
        />
      </Container>
      <Container>
        <Div>학년</Div>
        <Inputs
          placeholder="내용을 입력해주세요"
          name="grade"
          value={userForm.grade}
          onChange={(e) => handleChange(e)}
        />
      </Container>
      <Container>
        <Div>연락처</Div>
        <Inputs
          placeholder="내용을 입력해주세요"
          name="contact"
          value={userForm.contact}
          onChange={(e) => handleChange(e)}
        />
      </Container>
      <Container>
        <Div>레슨</Div>
        <Selects name="lesson" defaultValue={select} onChange={handleSelect}>
          <Option value="" selected disabled hidden>
            레슨 선택
          </Option>
          {lessons.map((lesson, index) => (
            <Option value={lesson} key={index}>
              {lesson}
            </Option>
          ))}
        </Selects>
      </Container>
      <ButtonContainer>
        <IButton onClick={handleSubmit}>등록</IButton>
      </ButtonContainer>
    </Content>
  </>
);

export default UserPresenter;
