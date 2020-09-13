import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

import { Layout, Breadcrumb, Input, Button } from "antd";

const { Content } = Layout;

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  padding: 10px;
`;

const Div = styled.div`
  justify-content: flex-end;
  display: flex;
  margin-right: 30px;
  width: 100px;
`;

const Inputs = styled(Input)`
  width: 300px;
  height: 30px;
  line-height: 17px;
  font-size: 14px;
  color: #9b9b9b;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 500px;
  justify-content: flex-end;
  margin-top: 15px;
`;

const IButton = styled(Button)``;

const CoachForm = ({ coachForm, handleChange }) => (
  <>
    <Content style={{ margin: "0 auto" }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item
          style={{
            fontSize: "18px",
            fontWeight: 600,
            marginLeft: "30px",
          }}
        >
          [ 코치 등록 ]
        </Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <Div>이름</Div>
        <Inputs
          placeholder="내용을 입력해주세요"
          name="이름"
          value={coachForm["이름"]}
          onChange={(e) => handleChange(e)}
        />
      </Container>
      <Container>
        <Div>나이</Div>
        <Inputs
          placeholder="내용을 입력해주세요"
          name="나이"
          value={coachForm["나이"]}
          onChange={(e) => handleChange(e)}
        />
      </Container>
      <Container>
        <Div>연락처</Div>
        <Inputs
          placeholder="내용을 입력해주세요"
          name="연락처"
          value={coachForm["연락처"]}
          onChange={(e) => handleChange(e)}
        />
      </Container>
    </Content>
  </>
);

export default CoachForm;