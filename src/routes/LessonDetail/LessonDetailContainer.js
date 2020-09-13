import React from "react";
import { connect } from "react-redux";
import LessonDetailPresenter from "./LessonDetailPresenter";
import { addLessonInfo } from "../../redux/actions/lessonActions";

import { message } from "antd";
class LessonDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      lessonInfo: {
        레슨이름: "",
        레슨코치: [],
        수강생: [],
        학교: "",
        학년: "",
        요일: "",
        시간: "",
        레슨비: "",
      },
      modalVisible: false,
      select: "",
      checkLesson: [],
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
    if (inputName === "레슨비") {
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
        ["시간"]: timeString,
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
    const keyValue = Number(lessons[lessons.length - 1]["key"]) + 1;

    for (const key in lessonInfo) {
      console.log("lessonInfo[key] :>> ", lessonInfo[key]);
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
      });
    }
  };

  handleCheckChange = (selectedRows) => {
    this.setState({
      checkLesson: [...selectedRows],
    });
  };

  render() {
    const {
      lessonInfo,
      loading,
      select,
      modalVisible,
      checkLesson,
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
    } = this;

    const test = Number(lessons[lessons.length - 1]["key"]);
    console.log("test :>> ", test);
    console.log("test :>> ", typeof `${test}`);
    console.log("test :>> ", `${test}`);
    console.log("this.props :>> ", this.props);
    console.log("this.state.page :>> ", this.state.page);
    return (
      <LessonDetailPresenter
        lessonInfo={lessonInfo}
        lessons={lessons}
        users={users}
        coaches={coaches}
        days={days}
        loading={loading}
        select={select}
        checkLesson={checkLesson}
        modalVisible={modalVisible}
        handleChange={handleChange}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        handleShowModal={handleShowModal}
        handleCancel={handleCancel}
        handleCheckChange={handleCheckChange}
        handleTimeChange={handleTimeChange}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonDetailContainer);
