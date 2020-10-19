import React from "react";
import { connect } from "react-redux";
import CoachPresenter from "./CoachPresenter";
import {
  thunkGetCoach,
  thunkGetCoaches,
  thunkRegisterCoach,
  thunkUpdateCoach,
} from "../../redux/thunk/coachThunk";

import { message } from "antd";
class CoachContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      coachForm: {
        name: "",
        birthday: "",
        contact: "",
      },
      modalVisible: false,
      select: "",
      checkCoach: [],
      update: false,
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    const { coaches, handleThunkGetCoaches } = this.props;
    if (coaches) {
      this.setState({
        loading: true,
      });
    }
    handleThunkGetCoaches();
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
    const { coachForm } = this.state;

    const value = e.target.value;
    const inputName = e.target.name;

    this.setState({
      coachForm: {
        ...coachForm,
        [inputName]: value,
      },
    });
  };

  handleDateChange = (date, dateString) => {
    const { coachForm } = this.state;
    this.setState({
      coachForm: {
        ...coachForm,
        birthday: dateString,
      },
    });
  };

  handleSubmit = async () => {
    const { coachForm } = this.state;
    const { coaches, handleThunkRegisterCoach } = this.props;

    let count = 0;

    for (const key in coachForm) {
      if (coachForm[key] === "") {
        message.error("코치 정보를 입력해주세요");
        break;
      } else {
        count = count + 1;
      }
    }

    if (count >= 3) {
      const response = await handleThunkRegisterCoach({
        ...coachForm,
      });
      if (response === 200) {
        message.success("코치 등록");
        this.setState({
          modalVisible: false,
          checkCoach: [],
          selectedRowKeys: [],
          coachForm: {
            name: "",
            birthday: "",
            contact: "",
          },
        });
      } else {
        message.error("코치 등록 실패");
        this.setState({
          modalVisible: false,
          checkCoach: [],
          selectedRowKeys: [],
          coachForm: {
            name: "",
            birthday: "",
            contact: "",
          },
        });
      }
    }
  };

  handleCheckChange = (selectedRowKeys, selectedRows) => {
    if (selectedRows.length === 1) {
      console.log("selectedRows :>> ", selectedRows);
      this.setState({
        checkCoach: [...selectedRows],
        update: true,
        coachForm: selectedRows[0],
        selectedRowKeys: [...selectedRowKeys],
      });
    } else {
      this.setState({
        checkCoach: [...selectedRows],
        selectedRowKeys: [...selectedRowKeys],
      });
    }
  };

  handleDeleteCoach = () => {
    const { checkCoach } = this.state;

    this.setState({
      checkCoach: [],
    });
  };

  handleUpdateCoach = async () => {
    const { coachForm } = this.state;
    const { handleThunkUpdateCoach, handleThunkGetCoaches } = this.props;

    let count = 0;
    console.log("coachForm update>>>", coachForm);
    for (const key in coachForm) {
      if (coachForm[key] === "") {
        message.error("코치 정보를 입력해주세요");
        break;
      } else {
        count = count + 1;
      }
    }

    if (count >= 2) {
      const response = await handleThunkUpdateCoach(coachForm, coachForm.key);
      console.log("update response", response);
      message.success("코치 수정");
      handleThunkGetCoaches();
      this.setState({
        modalVisible: false,
        checkCoach: [],
        selectedRowKeys: [],
        coachForm: {
          name: "",
          birthday: "",
          contact: "",
        },
      });
    }
  };

  render() {
    const {
      coachForm,
      loading,
      select,
      modalVisible,
      checkCoach,
      update,
      selectedRowKeys,
    } = this.state;
    const { coaches } = this.props;
    const {
      handleChange,
      handleSubmit,
      handleShowModal,
      handleCancel,
      handleCheckChange,
      handleDeleteCoach,
      handleUpdateCoach,
      handleDateChange,
    } = this;
    console.log("coaches", coaches);
    return (
      <CoachPresenter
        coachForm={coachForm}
        coaches={coaches}
        loading={loading}
        select={select}
        update={update}
        checkCoach={checkCoach}
        modalVisible={modalVisible}
        selectedRowKeys={selectedRowKeys}
        handleCheckChange={handleCheckChange}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleShowModal={handleShowModal}
        handleCancel={handleCancel}
        handleDeleteCoach={handleDeleteCoach}
        handleUpdateCoach={handleUpdateCoach}
        handleDateChange={handleDateChange}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coaches: state.coachReducer.coaches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleThunkGetCoaches: () => dispatch(thunkGetCoaches()),
    handleThunkGetCoach: (payload) => dispatch(thunkGetCoach(payload)),
    handleThunkUpdateCoach: (payload, id) =>
      dispatch(thunkUpdateCoach(payload, id)),
    handleThunkRegisterCoach: (payload) =>
      dispatch(thunkRegisterCoach(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoachContainer);
