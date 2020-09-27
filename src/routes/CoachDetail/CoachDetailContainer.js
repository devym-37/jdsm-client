import React from "react";
import { connect } from "react-redux";
import CoachDetailPresenter from "./CoachDetailPresenter";
import {
  addCoachProfile,
  updateCoachProfile,
  deleteCoachProfile,
} from "../../redux/actions/coachActions";

import { message } from "antd";
class CoachDetailContainer extends React.Component {
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

  handleSubmit = () => {
    const { coachForm } = this.state;
    const { handleAddCoach, coaches } = this.props;

    let count = 0;
    const keyValue =
      coaches.length === 0 ? 1 : Number(coaches[coaches.length - 1]["key"]) + 1;

    for (const key in coachForm) {
      if (coachForm[key] === "") {
        message.error("코치 정보를 입력해주세요");
        break;
      } else {
        count = count + 1;
      }
    }

    if (count >= 3) {
      handleAddCoach({ key: keyValue, ...coachForm });
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
      <CoachDetailPresenter
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoachDetailContainer);
