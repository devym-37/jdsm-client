import React from "react";
import { connect } from "react-redux";
import CoachDetailPresenter from "./CoachDetailPresenter";
import { addUserProfile } from "../../redux/actions/userActions";

import { notification } from "antd";
class CoachDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      page: "",
      loading: false,
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    console.log("params >>", params.page);
    this.setState({
      page:
        params.page === "user"
          ? "회원"
          : params.page === "lesson"
          ? "레슨"
          : params.page === "coach"
          ? "코치"
          : "",
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.page !== prevProps.match.params.page) {
      this.setState({
        page:
          this.props.match.params.page === "user"
            ? "회원"
            : this.props.match.params.page === "lesson"
            ? "레슨"
            : this.props.match.params.page === "coach"
            ? "코치"
            : "",
      });
    }
  }

  handleChange = (e) => {
    const { userForm } = this.state;
    const value = e.target.value;
    const inputName = e.target.name;
    this.setState({
      userForm: {
        ...userForm,
        [inputName]: value,
      },
    });
  };

  handleSelect = (value) => {
    const { userForm } = this.state;
    this.setState({
      userForm: {
        ...userForm,
        lesson: value,
      },
      select: value,
    });
  };

  handleNotification = () => {
    notification.open({
      description: "알림 - 빈칸에 내용을 입력하세요",
      style: {
        width: 280,
        height: 70,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d2dae2",
        fontWeight: 600,
        padding: 0,
        paddingBottom: 20,
        paddingRight: 35,
        color: "#ff3f34",
      },
    });
  };
  handleSubmit = () => {
    const { userForm } = this.state;
    const { handleNotification } = this;
    const { handleAddUser, history } = this.props;

    let submit = false;

    for (const key in userForm) {
      if (userForm[key] === "" && key !== "lesson") {
        handleNotification();
        break;
      } else {
        submit = true;
      }
    }
    if (submit) {
      handleAddUser(userForm);
      history.push("/");
    }
  };

  render() {
    const { userForm, page } = this.state;
    const { lessons, users, coaches } = this.props;
    const { handleChange, handleSelect, handleSubmit } = this;

    return (
      <CoachDetailPresenter
        userForm={userForm}
        handleChange={handleChange}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        page={page}
        coaches={coaches}
      />
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
  return {
    handleAddUser: (payload) => dispatch(addUserProfile(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoachDetailContainer);
