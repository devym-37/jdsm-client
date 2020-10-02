import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

import {
  Layout,
  Breadcrumb,
  Input,
  Select,
  Button,
  Card,
  Col,
  Row,
} from "antd";

const { Content } = Layout;
const { Option } = Select;

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  margin-bottom: 150px;
`;

const ICard = styled(Card)`
  border: 1px solid #f0f0f0;

  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
`;

const Div = styled.div`
  margin-bottom: 30px;
`;

const Inputs = styled(Input)`
  width: 300px;
  height: 30px;
  line-height: 17px;
  font-size: 14px;
  color: #9b9b9b;
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

const Title = styled.p`
  display: flex;
  justify-content: flex-end;
  font-weight: 600;
`;

const IButton = styled(Button)``;

const DashboardPresenter = ({ lessons, members, coaches }) => (
  <>
    <Helmet>
      <title>JD Sports 현황</title>
    </Helmet>

    <Container>
      <Breadcrumb style={{ margin: "0 0 30px 0" }}>
        <Breadcrumb.Item
          style={{
            fontSize: "18px",
            fontWeight: 600,
            marginLeft: "30px",
          }}
        >
          [ JD Sports 현황 ]
        </Breadcrumb.Item>
      </Breadcrumb>

      <Div>
        <Row gutter={16}>
          <Col span={6}>
            <ICard size="small" title="총 수강생 수">
              <Title> {`${members.length} 명`}</Title>
            </ICard>
          </Col>
          <Col span={6}>
            <ICard size="small" title="총 레슨 수">
              <Title>{`${lessons.length}`}</Title>
            </ICard>
          </Col>
          <Col span={6}>
            <ICard size="small" title="미납한 회원 수">
              미납 회원수
            </ICard>
          </Col>
          <Col span={6}>
            <ICard size="small" title="미납된 레슨비">
              미납 레슨비
            </ICard>
          </Col>
        </Row>
      </Div>
      <Div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={24}>
            <ICard size="small" title="미납 회원 명단">
              <Title> {`${members.length} 명`}</Title>
            </ICard>
          </Col>
        </Row>
      </Div>
      <Div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={24}>
            <ICard size="small" title="보강 회원 명단">
              <Title> {`${members.length} 명`}</Title>
            </ICard>
          </Col>
        </Row>
      </Div>
    </Container>
  </>
);

export default DashboardPresenter;
