import React from "react";
import { connect } from "react-redux";
import DashboardPresenter from "./DashboardPresenter";

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <DashboardPresenter />;
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

// export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

export default DashboardContainer;
