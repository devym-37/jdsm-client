import React from "react";
import { connect } from "react-redux";
import LessonDetailPresenter from "./LessonDetailPresenter";
import {
  addLessonInfo,
  deleteLessonInfo,
  updateLessonInfo,
} from "../../redux/actions/lessonActions";

import { message } from "antd";
class LessonDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      lessonInfo: {
        lessonName: "",
        lessonCoach: [],
        student: [],
        school: "",
        grade: "",
        day: "",
        time: "",
        pay: "",
      },
      modalVisible: false,
      select: "",
      checkLesson: [],
      update: false,
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    const { lessons } = this.props;
    if (lessons) {
      this.setState({
        loading: true,
      });
    }
  }

  handleShowModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleChange = (e) => {
    const { lessonInfo } = this.state;
    const value = e.target.value;
    const inputName = e.target.name;
    if (inputName === "pay") {
      let lessonValue = value.replace(/\D/g, "");
      this.setState({
        lessonInfo: {
          ...lessonInfo,
          [inputName]: lessonValue
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
      });
    } else {
      this.setState({
        lessonInfo: {
          ...lessonInfo,
          [inputName]: value,
        },
      });
    }
  };

  handleTimeChange = (time, timeString) => {
    const { lessonInfo } = this.state;
    this.setState({
      lessonInfo: {
        ...lessonInfo,
        ["time"]: timeString,
      },
    });
  };

  handleSelect = (name, value) => {
    const { lessonInfo } = this.state;

    this.setState({
      lessonInfo: {
        ...lessonInfo,
        [name]: value,
      },
    });
  };

  handleSubmit = () => {
    const { lessonInfo } = this.state;
    const { handleAddLessonInfo, lessons } = this.props;

    let count = 0;
    const keyValue =
      lessons.length === 0 ? 1 : Number(lessons[lessons.length - 1]["key"]) + 1;

    for (const key in lessonInfo) {
      if (lessonInfo[key] === "") {
        message.error("레슨 정보를 입력해주세요");
        break;
      } else if (
        typeof lessonInfo[key] === "object" &&
        lessonInfo[key].length === 0
      ) {
        message.error("레슨 정보를 입력해주세요");
        break;
      } else {
        count = count + 1;
      }
    }

    if (count === 8) {
      message.success("레슨 등록");
      handleAddLessonInfo({ key: `${keyValue}`, ...lessonInfo });
      this.setState({
        modalVisible: false,
        lessonInfo: {
          lessonName: "",
          lessonCoach: [],
          student: [],
          school: "",
          grade: "",
          day: "",
          time: "",
          pay: "",
        },
      });
    }
  };

  handleCheckChange = (selectedRowKeys, selectedRows) => {
    if (selectedRows.length === 1) {
      this.setState({
        checkLesson: [...selectedRows],
        update: true,
        lessonInfo: selectedRows[0],
        selectedRowKeys: [...selectedRowKeys],
      });
    } else {
      this.setState({
        checkLesson: [...selectedRows],
        selectedRowKeys: [...selectedRowKeys],
      });
    }
  };

  handleDeleteLesson = () => {
    const { checkLesson } = this.state;
    const { handleDeleteLesson } = this.props;
    this.setState({
      checkLesson: [],
    });
    handleDeleteLesson(checkLesson);
  };

  handleUpdateLesson = () => {
    const { lessonInfo } = this.state;
    const { handleUpdateLesson } = this.props;

    let count = 0;

    for (const key in lessonInfo) {
      if (lessonInfo[key] === "" && key !== "lesson") {
        message.error("레슨 정보를 입력해주세요");
        break;
      } else {
        count = count + 1;
      }
    }

    if (count >= 4) {
      handleUpdateLesson(lessonInfo);
      message.success("레슨 수정");
      this.setState({
        modalVisible: false,
        lessonInfo: {
          lessonName: "",
          lessonCoach: [],
          student: [],
          school: "",
          grade: "",
          day: "",
          time: "",
          pay: "",
        },
        checkLesson: [],
        selectedRowKeys: [],
      });
    }
  };

  render() {
    const {
      lessonInfo,
      loading,
      select,
      modalVisible,
      checkLesson,
      update,
      selectedRowKeys,
    } = this.state;
    const { lessons, users, coaches, days } = this.props;
    const {
      handleChange,
      handleSelect,
      handleSubmit,
      handleTimeChange,
      handleShowModal,
      handleCancel,
      handleCheckChange,
      handleDeleteLesson,
      handleUpdateLesson,
    } = this;

    return (
      <LessonDetailPresenter
        lessonInfo={lessonInfo}
        lessons={lessons}
        users={users}
        coaches={coaches}
        days={days}
        loading={loading}
        select={select}
        update={update}
        selectedRowKeys={selectedRowKeys}
        checkLesson={checkLesson}
        modalVisible={modalVisible}
        handleChange={handleChange}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        handleShowModal={handleShowModal}
        handleCancel={handleCancel}
        handleCheckChange={handleCheckChange}
        handleTimeChange={handleTimeChange}
        handleDeleteLesson={handleDeleteLesson}
        handleUpdateLesson={handleUpdateLesson}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lessons: state.lessonReducer.lesson,
    users: state.userReducer.users,
    coaches: state.coachReducer.coaches,
    days: state.lessonReducer.days,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddLessonInfo: (payload) => dispatch(addLessonInfo(payload)),
    handleDeleteLesson: (payload) => dispatch(deleteLessonInfo(payload)),
    handleUpdateLesson: (payload) => dispatch(updateLessonInfo(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonDetailContainer);
