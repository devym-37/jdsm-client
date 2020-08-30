import React from "react";
import { connect } from "react-redux";
import LessonPresenter from "./LessonPresenter";

class LessonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <LessonPresenter />;
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

// export default connect(mapStateToProps, mapDispatchToProps)(LessonContainer);

export default LessonContainer;
