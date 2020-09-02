import React from "react";
import { connect } from "react-redux";
import TableListPresenter from "./TableListPresenter";
import { addUserProfile } from "../../redux/actions/userActions";

import { notification } from "antd";
class TableListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userForm: {
        name: "",
        school: "",
        grade: "",
        contact: "",
        lesson: "",
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
      message: "알림",
      description: "빈칸에 내용을 입력하세요",
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
      <TableListPresenter
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

export default connect(mapStateToProps, mapDispatchToProps)(TableListContainer);
