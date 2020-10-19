import React from "react";
import { connect } from "react-redux";
import LessonPresenter from "./LessonPresenter";
import {
  addLessonInfo,
  deleteLessonInfo,
  updateLessonInfo,
} from "../../redux/actions/lessonActions";
import { thunkGetMembers } from "../../redux/thunk/memberThnuk";
import { thunkGetCoaches } from "../../redux/thunk/coachThunk";
import {
  thunkRegisterLesson,
  thunkRegisterLessonCoach,
  thunkRegisterLessonMember,
} from "../../redux/thunk/lessonThunk";

import { message } from "antd";
class LessonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      lessonInfo: {
        name: "",
        coachKeys: [],
        memberKeys: [],
        price: "",
        schedules: [
          {
            dayOfWeed: "",
            startTime: "",
            endTime: "",
          },
        ],
      },
      modalVisible: false,
      select: "",
      checkLesson: [],
      update: false,
      selectedRowKeys: [],
      dayOfWed: {
        월요일: "MON",
        화요일: "TUE",
        수요일: "WED",
        목요일: "TUR",
        금요일: "FRI",
        토요일: "SAT",
        일요일: "SUN",
      },
    };
  }

  componentDidMount() {
    const { lessons, handleThunkGetCoaches, handleGetMembersInfo } = this.props;
    if (lessons) {
      this.setState({
        loading: true,
      });
    }
    handleThunkGetCoaches();
    handleGetMembersInfo();
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
    this.setState({
      lessonInfo: {
        ...lessonInfo,
        [inputName]: value,
      },
    });
  };

  handleTimeChange = (time, timeString) => {
    const { lessonInfo } = this.state;
    console.log("timeString", timeString);
    console.log("lessonInfo", lessonInfo);
    console.log("lessonInfo.schedules[0]", lessonInfo.schedules[0]);
    const startTime = timeString[0];
    const endTime = timeString[1];
    this.setState({
      lessonInfo: {
        ...lessonInfo,
        schedules: [
          {
            ...lessonInfo.schedules[0],
            startTime: startTime,
            endTime: endTime,
          },
        ],
      },
    });
  };

  handleSelect = (name, value) => {
    const { lessonInfo, dayOfWed } = this.state;
    console.log("lessonInfo 11>>>>", lessonInfo);
    if (name === "dayOfWeed") {
      this.setState({
        lessonInfo: {
          ...lessonInfo,
          schedules: [
            {
              ...lessonInfo.schedules[0],
              dayOfWeed: dayOfWed[value],
            },
          ],
        },
      });
    } else {
      this.setState({
        lessonInfo: {
          ...lessonInfo,
          [name]: value,
        },
      });
    }
  };

  handleSubmit = async () => {
    const { lessonInfo } = this.state;
    const {
      lessons,
      handleThunkRegisterLesson,
      handleThunkRegisterLessonCoach,
      handleThunkRegisterLessonMember,
    } = this.props;

    let count = 0;
    const keyValue =
      lessons.length === 0 ? 1 : Number(lessons[lessons.length - 1]["key"]) + 1;
    console.log("submit lessonInfo", lessonInfo);
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
    console.log("count", count);
    if (count === 5) {
      message.success("레슨 등록");
      const {
        code,
        message: { id },
      } = await handleThunkRegisterLesson(lessonInfo);
      console.log("lessonInfo", lessonInfo);
      console.log("lesson 111 response", code);
      console.log("lesson 222 response", id);
      if (code === 200) {
        handleThunkRegisterLessonCoach(lessonInfo.coachKeys, id);
        handleThunkRegisterLessonMember(lessonInfo.memberKeys, id);
        this.setState({
          modalVisible: false,
          lessonInfo: {
            name: "",
            coachKeys: [],
            memberKeys: [],
            price: "",
            schedules: [
              {
                dayOfWeed: "",
                startTime: "",
                endTime: "",
              },
            ],
          },
        });
      } else {
        message.error("레슨 등록 실패");
        this.setState({
          modalVisible: false,
          lessonInfo: {
            name: "",
            coachKeys: [],
            memberKeys: [],
            price: "",
            schedules: [
              {
                dayOfWeed: "",
                startTime: "",
                endTime: "",
              },
            ],
          },
        });
      }
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
          name: "",
          coachKeys: [],
          memberKeys: [],
          price: "",
          schedules: [
            {
              dayOfWeed: "",
              startTime: "",
              endTime: "",
            },
          ],
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
    const { lessons, members, coaches, days } = this.props;
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
    console.log("this.state :>> ", this.state);
    console.log("this.props", this.props);
    return (
      <LessonPresenter
        lessonInfo={lessonInfo}
        lessons={lessons}
        members={members}
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
    members: state.memberReducer.members,
    coaches: state.coachReducer.coaches,
    days: state.lessonReducer.days,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetMembersInfo: () => dispatch(thunkGetMembers()),
    handleThunkGetCoaches: () => dispatch(thunkGetCoaches()),
    handleThunkRegisterLesson: (payload) =>
      dispatch(thunkRegisterLesson(payload)),
    handleThunkRegisterLessonCoach: (payload, id) =>
      dispatch(thunkRegisterLessonCoach(payload, id)),
    handleThunkRegisterLessonMember: (payload, id) =>
      dispatch(thunkRegisterLessonMember(payload, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonContainer);
