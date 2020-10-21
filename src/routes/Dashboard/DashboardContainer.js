import React from "react";
import { connect } from "react-redux";
import DashboardPresenter from "./DashboardPresenter";
import { thunkGetMembers } from "../../redux/thunk/memberThnuk";
import { thunkGetLessons } from "../../redux/thunk/lessonThunk";

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { handleThunkGetMembers, handleThunkGetLessons } = this.props;
    handleThunkGetMembers();
    handleThunkGetLessons();
  }
  render() {
    const { lessons, members, coaches } = this.props;
    console.log("members", members);
    return (
      <DashboardPresenter
        lessons={lessons}
        members={members}
        coaches={coaches}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lessons: state.lessonReducer.lesson,
    members: state.memberReducer.members,
    coaches: state.coachReducer.coaches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleThunkGetMembers: () => dispatch(thunkGetMembers()),
    handleThunkGetLessons: () => dispatch(thunkGetLessons()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
