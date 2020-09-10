import React from "react";
import { connect } from "react-redux";
import UserDetailPresenter from "./UserDetailPresenter";
import { addUserProfile } from "../../redux/actions/userActions";

import { message } from "antd";

class UserDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userForm: {
        이름: "",
        학교: "",
        학년: "",
        연락처: "",
        레슨: "",
      },
      modalVisible: false,
      select: "",
      checkUser: [],
    };
  }

  componentDidMount() {
    const { users } = this.props;
    if (users) {
      this.setState({
        loading: true,
      });
    }
  }

  handleShowModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

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

  handleSubmit = () => {
    const { userForm } = this.state;
    const { handleAddUser, users } = this.props;

    let count = 0;
    const keyValue = users.length + 1;

    for (const key in userForm) {
      if (userForm[key] === "" && key !== "레슨") {
        message.error("회원 정보를 입력해주세요");
        break;
      } else {
        count = count + 1;
      }
    }

    if (count >= 4) {
      handleAddUser({ key: `${keyValue}`, ...userForm });
      message.success("회원 등록 완료");
      this.setState({
        modalVisible: false,
      });
    }
  };

  handleCheckChange = (selectedRows) => {
    this.setState({
      checkUser: [...selectedRows],
    });
  };

  render() {
    const { userForm, loading, select, modalVisible, checkUser } = this.state;
    const { lessons, users } = this.props;
    const {
      handleChange,
      handleSelect,
      handleSubmit,
      handleShowModal,
      handleCancel,
      handleCheckChange,
    } = this;
    console.log("checkUser :>> ", checkUser);
    return (
      <UserDetailPresenter
        userForm={userForm}
        lessons={lessons}
        users={users}
        loading={loading}
        select={select}
        checkUser={checkUser}
        modalVisible={modalVisible}
        handleCheckChange={handleCheckChange}
        handleChange={handleChange}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        handleShowModal={handleShowModal}
        handleCancel={handleCancel}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,
    lessons: state.lessonReducer.lesson,
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
)(UserDetailContainer);
