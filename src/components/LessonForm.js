import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import { Layout, Breadcrumb, Input, Select, Button, TimePicker } from "antd";

const { RangePicker } = TimePicker;
const { Content } = Layout;
const { Option } = Select;

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

const IButton = styled(Button)``;

const LessonPresenter = ({
  lessonInfo,
  users,
  coaches,
  days,
  handleChange,
  handleSelect,
  handleTimeChange,
}) => (
  <>
    <Helmet>
      <title>새로운 레슨 등록</title>
    </Helmet>

    <Content style={{ margin: "0 auto" }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item
          style={{
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          [ 레슨 등록 ]
        </Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <Div>레슨 이름</Div>
        <Inputs
          placeholder="내용을 입력해주세요"
          name="name"
          value={lessonInfo.name}
          onChange={(e) => handleChange(e)}
        />
      </Container>
      <Container>
        <Div>코치</Div>
        <Selects
          mode="multiple"
          showArrow
          name="coachIds"
          placeholder="코치 선택"
          defaultValue={lessonInfo.coachIds}
          onChange={handleSelect.bind(this, "coachIds")}
        >
          {coaches &&
            coaches.map((coach, index) => (
              <Option value={coach.name} key={index}>
                {coach.name}
              </Option>
            ))}
        </Selects>
      </Container>
      <Container>
        <Div>수강생</Div>
        <Selects
          mode="multiple"
          showArrow
          name="memberIds"
          placeholder="수강생 선택"
          defaultValue={lessonInfo.memberIds}
          onChange={handleSelect.bind(this, "memberIds")}
        >
          {users &&
            users.map((user, index) => (
              <Option value={user.name} key={index}>
                {`${user.name} - ${user.school} - ${user.grade}`}
              </Option>
            ))}
        </Selects>
      </Container>

      <Container>
        <Div>요일</Div>
        <Selects
          name="dayOfWeed"
          placeholder="요일 선택"
          onChange={handleSelect.bind(this, "dayOfWeed")}
        >
          {days &&
            days.map((day, index) => (
              <Option value={day} key={index}>
                {day}
              </Option>
            ))}
        </Selects>
      </Container>
      <Container>
        <Div>수업 시간</Div>
        <RangePicker
          minuteStep={30}
          format={"HH:mm"}
          onChange={handleTimeChange}
        />
      </Container>

      <Container>
        <Div>레슨비</Div>
        <Inputs
          placeholder="내용을 입력해주세요"
          name="price"
          value={lessonInfo.price}
          onChange={(e) => handleChange(e)}
        />
      </Container>
    </Content>
  </>
);

export default LessonPresenter;
