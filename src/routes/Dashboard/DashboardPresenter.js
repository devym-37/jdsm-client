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
  display: block;
  justify-content: center;
  padding: 30px;
  margin-bottom: 150px;
`;

const ICard = styled(Card)`
  border: 1px solid #f0f0f0;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 100px rgba(166, 173, 201, 0.2);
`;

const Div = styled.div`
  display: block;
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

Number.prototype.format = function(){
  if(this==0) {
    return 0;
  }

  var reg = /(^[+-]?\d+)(\d{3})/;
  var n = (this + '');

  while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

  return n;
};

String.prototype.format = function(){
  var num = parseFloat(this);
  if( isNaN(num) ) return "0";

  return num.format();
};

const DashboardPresenter = ({ lessons, members, coaches }) => {
  
  const summaries = [{
    'title': 'Lessons',
    'data': `${lessons.length} 레슨`
  }, {
    'title': 'Members',
    'data': `${members.length} 명`
  }, {
    'title': '미납자',
    'data': `${lessons.length} 명`
  }, {
    'title': '미납비',
    'data': `${'100000000'.format()} 원`
  }];

  const summaryCards = summaries.map((summary) => {
    return <Col span={6}>
      <Card
        style={{
          borderRadius: 15,
          boxShadow: '0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 100px rgba(166, 173, 201, 0.2)'
        }}
        headStyle={{
          minHeight: 60,
          fontWeight: 'bold'
        }}
        bodyStyle={{
          minHeight: 80,
          fontWeight: 'bold',
          textAlign: 'right'
        }}
        title={summary.title}>
          {summary.data}
      </Card>
    </Col>
  })

  return (
    <>
      <Helmet>
        <title>JD Football Academy 현황</title>
      </Helmet>
  
      <Container>  
        <Div>
          <Row gutter={16}>
            { summaryCards }
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
}

export default DashboardPresenter;
