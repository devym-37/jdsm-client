import React from "react";
import { connect } from "react-redux";
import UserPresenter from "./UserPresenter";

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <UserPresenter />;
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

// export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);

export default UserContainer;
