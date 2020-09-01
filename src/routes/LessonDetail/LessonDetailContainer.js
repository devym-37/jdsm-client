import React from "react";
import { connect } from "react-redux";
import LessonDetailPresenter from "./LessonDetailPresenter";

class LessonDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("this.props :>> ", this.props);
    // this.props.match.params.day
    return <LessonDetailPresenter />;
  }
}

// const mapStateToProps = (state) => {
//   return {
//     player: state.userReducer.playerName,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     handleReduxPlayer: (payload) => dispatch(playerSearch(payload)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LessonDetailContainer);

export default LessonDetailContainer;
