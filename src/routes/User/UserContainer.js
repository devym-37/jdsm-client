import React from "react";
import { connect } from "react-redux";
import UserPresenter from "./UserPresenter";
import { addUserProfile } from "../../redux/actions/userActions";

import { notification } from "antd";
class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userForm: {
        이름: "",
        학교: "",
        학년: "",
        연락처: "",
        레슨: "",
      },
      select: "",
    };
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
    const { userForm, select } = this.state;
    const { lessons } = this.props;
    const { handleChange, handleSelect, handleSubmit } = this;
    return (
      <UserPresenter
        userForm={userForm}
        handleChange={handleChange}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        lessons={lessons}
        select={select}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lessons: state.lessonReducer.lesson,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddUser: (payload) => dispatch(addUserProfile(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
