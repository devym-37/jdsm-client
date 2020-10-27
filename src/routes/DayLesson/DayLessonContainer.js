import React from "react";
import { connect } from "react-redux";
import DayLessonPresenter from "./DayLessonPresenter";

import { thunkGetMembers } from "../../redux/thunk/memberThnuk";
import { thunkGetCoaches } from "../../redux/thunk/coachThunk";
import {
  thunkRegisterLesson,
  thunkRegisterLessonCoach,
  thunkRegisterLessonMember,
  thunkGetLessons,
  thunkGetLessonDay,
  thunkGetLessonCoaches,
  thunkGetLessonMembers,
  thunkGetLessonInfo,
} from "../../redux/thunk/lessonThunk";

import { message } from "antd";
class DayLessonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      select: "",
      checkLesson: [],
      update: false,
      selectedRowKeys: [],
      dayOfEng: {
        월요일: "MONDAY",
        화요일: "TUESDAY",
        수요일: "WEDNESDAY",
        목요일: "THURSDAY",
        금요일: "FRIDAY",
        토요일: "SATURDAY",
        일요일: "SUNDAY",
      },
      dayOfKor: {
        MONDAY: "월요일",
        TUESDAY: "화요일",
        WEDNESDAY: "수요일",
        THURSDAY: "목요일",
        FRIDAY: "금요일",
        SATURDAY: "토요일",
        SUNDAY: "일요일",
      },
      selectDay: "",
      lessons: [],
      lessonList: [],
    };
  }

  componentDidMount = async () => {
    const {
      handleThunkGetLessonDay,
      match: { params },
    } = this.props;
    const { dayOfEng } = this.state;
    const { getDetailLessonInfo } = this;

    this.setState({
      selectDay: params.day,
    });

    const response = await handleThunkGetLessonDay(dayOfEng[params.day]);

    if (response !== undefined && response.status === 200) {
      const {
        data: { data },
      } = response;

      getDetailLessonInfo(data);

      this.setState({
        loading: true,
      });
    } else if (response === undefined) {
      this.setState({
        lessons: [],
        loading: true,
      });
    }
  };

  componentDidUpdate = async (prevProps) => {
    const {
      match: { params },
      handleThunkGetLessonDay,
    } = this.props;
    const { dayOfEng } = this.state;
    const { getDetailLessonInfo } = this;

    if (prevProps.match.params.day !== params.day) {
      const response = await handleThunkGetLessonDay(dayOfEng[params.day]);

      if (response !== undefined && response.status === 200) {
        const {
          data: { data },
        } = response;

        getDetailLessonInfo(data);

        this.setState({
          loading: true,
        });
      } else if (response === undefined) {
        this.setState({
          lessons: [],
          loading: true,
        });
      }
      this.setState({
        selectDay: params.day,
      });
    }
  };

  getDetailLessonInfo = async (payload) => {
    const { handleThunkGetLessonInfo } = this.props;

    const lesson = payload;
    const dataList = [];
    const dataInfo = [];

    for (let i = 0; i < lesson.length; i++) {
      let {
        data: { data },
      } = await handleThunkGetLessonInfo(lesson[i].key);
      dataList.push(data.members);
      dataInfo.push(data);
    }

    this.setState({
      lessons: dataInfo,
      lessonList: dataList,
    });
  };

  handleChange = (e, key) => {
    const value = e.target.value;
    const inputName = e.target.name;
    console.log("e", e);
    console.log("value", value);
    console.log("inputName", inputName);
    console.log("key", key);
  };

  handleSelect = (name, value) => {
    const { lessonInfo, dayOfEng } = this.state;

    if (name === "dayOfWeek") {
      this.setState({
        lessonInfo: {
          ...lessonInfo,
          schedules: [
            {
              ...lessonInfo.schedules[0],
              dayOfWeek: dayOfEng[value],
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

  render() {
    const { loading, dayOfKor, selectDay, lessons, lessonList } = this.state;

    const { handleChange, handleSelect } = this;
    console.log("test ", this.state);
    return (
      <DayLessonPresenter
        selectDay={selectDay}
        lessons={lessons}
        lessonList={lessonList}
        loading={loading}
        dayOfKor={dayOfKor}
        handleChange={handleChange}
        handleSelect={handleSelect}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // lessons: state.lessonReducer.lesson,
    members: state.memberReducer.members,
    coaches: state.coachReducer.coaches,
    days: state.lessonReducer.days,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleThunkGetLessonDay: (payload) => dispatch(thunkGetLessonDay(payload)),
    handleThunkGetLessonCoaches: (key) => dispatch(thunkGetLessonCoaches(key)),
    handleThunkGetLessonMembers: (key) => dispatch(thunkGetLessonMembers(key)),
    handleThunkGetLessonInfo: (key) => dispatch(thunkGetLessonInfo(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayLessonContainer);
