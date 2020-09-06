import React from "react";
import { connect } from "react-redux";
import LessonPresenter from "./LessonPresenter";
import { addLessonInfo } from "../../redux/actions/lessonActions";

import { notification } from "antd";
class LessonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  handleChange = (e) => {
    const { lessonInfo } = this.state;
    const value = e.target.value;
    const inputName = e.target.name;
    this.setState({
      lessonInfo: {
        ...lessonInfo,
        [inputName]: value,
      },
    });
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

  handleNotification = () => {
    notification.open({
      description: "알림 - 빈칸에 내용을 입력하세요",
      style: {
        width: 280,
        height: 70,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d2dae2",
        fontWeight: 600,
        padding: 0,
        paddingBottom: 20,
        paddingRight: 35,
        color: "#ff3f34",
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
    const { handleNotification } = this;
    const { handleAddLesson, history } = this.props;

    let count = 0;
    for (const key in lessonInfo) {
      if (lessonInfo[key] === "") {
        handleNotification();
        break;
      } else if (
        typeof lessonInfo[key] === "object" &&
        lessonInfo[key].length === 0
      ) {
        handleNotification();
        break;
      } else {
        count = count + 1;
      }
    }

    if (count === 8) {
      handleAddLesson(lessonInfo);
      history.push("/");
    }
  };

  render() {
    const { lessonInfo } = this.state;
    const { users, coaches, days } = this.props;
    const { handleChange, handleSelect, handleSubmit, handleTimeChange } = this;

    return (
      <LessonPresenter
        lessonInfo={lessonInfo}
        users={users}
        coaches={coaches}
        days={days}
        handleChange={handleChange}
        handleSelect={handleSelect}
        handleTimeChange={handleTimeChange}
        handleSubmit={handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,
    coaches: state.coachReducer.coaches,
    days: state.lessonReducer.days,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddLesson: (payload) => dispatch(addLessonInfo(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonContainer);
