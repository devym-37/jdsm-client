import React from "react";
import { connect } from "react-redux";
import DashboardPresenter from "./DashboardPresenter";

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { lessons, members, coaches } = this.props;

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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
