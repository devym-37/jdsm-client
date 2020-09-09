import React from "react";
import { connect } from "react-redux";
import UserDetailPresenter from "./UserDetailPresenter";
import { addUserProfile } from "../../redux/actions/userActions";

import { notification } from "antd";
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

  handleNotification = () => {
    notification.open({
      description: "알림 - 빈칸에 내용을 입력하세요 ??",
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

    let count = 0;

    for (const key in userForm) {
      if (userForm[key] === "" && key !== "lesson") {
        handleNotification();
        break;
      } else {
        count = count + 1;
      }
    }
    if (count >= 4) {
      handleAddUser(userForm);
      this.setState({
        modalVisible: false,
      });
      history.push("/");
    }
  };

  render() {
    const { userForm, loading, select, modalVisible } = this.state;
    const { lessons, users } = this.props;
    const {
      handleChange,
      handleSelect,
      handleSubmit,
      handleShowModal,
      handleCancel,
    } = this;

    return (
      <UserDetailPresenter
        userForm={userForm}
        lessons={lessons}
        users={users}
        loading={loading}
        select={select}
        modalVisible={modalVisible}
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
