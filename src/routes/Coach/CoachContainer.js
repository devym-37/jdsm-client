import React from "react";
import { connect } from "react-redux";
import CoachPresenter from "./CoachPresenter";

class CoachContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <CoachPresenter />;
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

// export default connect(mapStateToProps, mapDispatchToProps)(CoachContainer);

export default CoachContainer;
