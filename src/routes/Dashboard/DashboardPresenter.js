import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

import { Layout, Card as AntdCard, Col, Row } from "antd";
import PaidTable from './../../components/Table/paid/PaidTable';
import Card from './../../components/Card/Card';

const { Content } = Layout;

const Container = styled(Content)`
  display: block;
  justify-content: center;
  padding: 30px;
  margin-top: "-6rem";
  margin-bottom: 150px;
`;

const ICard = styled(AntdCard)`
  border: 1px solid #f0f0f0;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 100px rgba(166, 173, 201, 0.2);
`;

const Div = styled.div`
  display: block;
  margin-bottom: 30px;
`;

const Title = styled.p`
  display: flex;
  justify-content: flex-end;
  font-weight: 600;
`;

Number.prototype.format = function () {
  if (this == 0) {
    return 0;
  }

  var reg = /(^[+-]?\d+)(\d{3})/;
  var n = this + "";

  while (reg.test(n)) n = n.replace(reg, "$1" + "," + "$2");

  return n;
};

String.prototype.format = function () {
  var num = parseFloat(this);
  if (isNaN(num)) return "0";

  return num.format();
};

const DashboardPresenter = ({ lessons, members, coaches }) => {
  const summaries = [
    {
      title: "레슨수",
      data: `${lessons.length}`,
    },
    {
      title: "회원수",
      data: `${members.length}`,
    },
    {
      title: "미납자",
      data: `${lessons.length}`,
    },
    {
      title: "미납비",
      data: `${"100000000".format()}`,
    },
  ];

  const renderCards = summaries.map((summary) => {
    return (
      <Col span={6}>
        <Card
          title={summary.title}
          body={<span>{summary.data}</span>} />
      </Col>
    );
  });

  return (
    <>
      <Helmet>
        <title>JD Football Academy 현황</title>
      </Helmet>

      <Container>
        <Div>
          <Row gutter={16}>{renderCards}</Row>
        </Div>
        <Div>
          <PaidTable />
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
};

export default DashboardPresenter;
