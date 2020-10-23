import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../components/Loader";
import DayLessonTable from "../../components/DayLessonTable";

import { Layout, Breadcrumb, Button, Table, Tag, Empty, Modal } from "antd";
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

const DayLessonPresenter = ({
  lessons,
  lessonList,
  loading,
  dayOfKor,
  selectDay,
  handleChange,
}) => (
  <>
    <Helmet>
      <title>{`${selectDay} 레슨`}</title>
    </Helmet>
    <Content style={{ margin: "0 auto", width: 1100, maxWidth: "100%" }}>
      <Breadcrumb style={{ margin: "30px 0" }}>
        <Breadcrumb.Item
          style={{
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          {`[ ${selectDay} 레슨 ]`}
        </Breadcrumb.Item>
      </Breadcrumb>

      {!loading ? (
        <Loader />
      ) : lessons.length !== 0 && lessonList.length !== 0 ? (
        <DayLessonTable
          outTable={lessons}
          innerTable={lessonList}
          handleChange={handleChange}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Content>
  </>
);

export default DayLessonPresenter;
