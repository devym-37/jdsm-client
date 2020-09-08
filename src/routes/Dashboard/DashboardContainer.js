import React from "react";
import { connect } from "react-redux";
import DashboardPresenter from "./DashboardPresenter";

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { lessons, users, coaches } = this.props;

    return (
      <DashboardPresenter lessons={lessons} users={users} coaches={coaches} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lessons: state.lessonReducer.lesson,
    users: state.userReducer.users,
    coaches: state.coachReducer.coaches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
