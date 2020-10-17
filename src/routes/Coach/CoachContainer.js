import React from "react";
import { connect } from "react-redux";
import CoachPresenter from "./CoachPresenter";
import {
  addCoachProfile,
  updateCoachProfile,
  deleteCoachProfile,
} from "../../redux/actions/coachActions";
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
    const { coaches } = this.props;
    if (coaches) {
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
    const { handleAddCoach, coaches, handleThunkRegisterCoach } = this.props;

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
        key: coaches.length + 1,
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
    const { handleDeleteCoach } = this.props;
    this.setState({
      checkCoach: [],
    });
    handleDeleteCoach(checkCoach);
  };

  handleUpdateCoach = () => {
    const { coachForm } = this.state;
    const { handleUpdateCoach } = this.props;

    let count = 0;

    for (const key in coachForm) {
      if (coachForm[key] === "") {
        message.error("코치 정보를 입력해주세요");
        break;
      } else {
        count = count + 1;
      }
    }

    if (count >= 2) {
      handleUpdateCoach(coachForm);
      message.success("코치 수정");
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
    handleAddCoach: (payload) => dispatch(addCoachProfile(payload)),
    handleUpdateCoach: (payload) => dispatch(updateCoachProfile(payload)),
    handleDeleteCoach: (payload) => dispatch(deleteCoachProfile(payload)),
    handleThunkGetCoaches: () => dispatch(thunkGetCoaches()),
    handleThunkGetCoach: (payload) => dispatch(thunkGetCoach(payload)),
    handleThunkUpdateCoach: (payload, id) =>
      dispatch(thunkUpdateCoach(payload, id)),
    handleThunkRegisterCoach: (payload) =>
      dispatch(thunkRegisterCoach(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoachContainer);
