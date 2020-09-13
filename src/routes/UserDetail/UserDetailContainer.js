import React from "react";
import { connect } from "react-redux";
import UserDetailPresenter from "./UserDetailPresenter";
import {
  addUserProfile,
  deleteUserProfile,
  updateUserProfile,
} from "../../redux/actions/userActions";

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
      selectedRowKeys: [],
      update: false,
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

  handleShowModal = (e) => {
    const name = e.target.name;

    this.setState({
      modalVisible: true,
    });
  };

  handleCancel = (e) => {
    const name = e.target.name;

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
    const keyValue = Number(users[users.length - 1]["key"]) + 1;

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
      message.success("회원 등록");
      this.setState({
        modalVisible: false,
      });
    }
  };

  handleCheckChange = (selectedRowKeys, selectedRows) => {
    if (selectedRows.length === 1) {
      console.log("selectedRows :>> ", selectedRows);
      this.setState({
        checkUser: [...selectedRows],
        update: true,
        userForm: selectedRows[0],
      });
    } else {
      this.setState({
        checkUser: [...selectedRows],
      });
    }
  };

  handleDeleteUser = () => {
    const { checkUser } = this.state;
    const { handleDelUser } = this.props;
    this.setState({
      checkUser: [],
    });
    handleDelUser(checkUser);
  };

  handleUpdateUser = () => {
    const { userForm } = this.state;
    const { handleUpdateUser } = this.props;
    console.log("click");
    let count = 0;

    for (const key in userForm) {
      if (userForm[key] === "" && key !== "레슨") {
        message.error("회원 정보를 입력해주세요");
        break;
      } else {
        count = count + 1;
      }
    }

    if (count >= 4) {
      handleUpdateUser(userForm);
      message.success("회원 수정");
      this.setState({
        modalVisible: false,
        checkUser: [],
      });
    }
  };

  render() {
    const {
      userForm,
      loading,
      select,
      modalVisible,
      checkUser,
      update,
      selectedRowKeys,
    } = this.state;
    const { lessons, users } = this.props;
    const {
      handleChange,
      handleSelect,
      handleSubmit,
      handleShowModal,
      handleCancel,
      handleCheckChange,
      handleDeleteUser,
      handleUpdateUser,
    } = this;
    console.log("update :>> ", update);
    console.log("checkUser :>> ", checkUser);
    console.log("users 1234 :>> ", users);
    return (
      <UserDetailPresenter
        userForm={userForm}
        lessons={lessons}
        users={users}
        loading={loading}
        select={select}
        update={update}
        checkUser={checkUser}
        modalVisible={modalVisible}
        selectedRowKeys={selectedRowKeys}
        handleCheckChange={handleCheckChange}
        handleChange={handleChange}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        handleShowModal={handleShowModal}
        handleCancel={handleCancel}
        handleDeleteUser={handleDeleteUser}
        handleUpdateUser={handleUpdateUser}
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
    handleDelUser: (payload) => dispatch(deleteUserProfile(payload)),
    handleUpdateUser: (payload) => dispatch(updateUserProfile(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailContainer);
