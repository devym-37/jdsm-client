import React from "react";
import { connect } from "react-redux";
import CoachDetailPresenter from "./CoachDetailPresenter";
import { addCoachProfile } from "../../redux/actions/coachActions";

import { message } from "antd";
class CoachDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      coachForm: {
        이름: "",
        나이: "",
        연락처: "",
      },
      modalVisible: false,
      select: "",
      checkCoach: [],
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

  handleSubmit = () => {
    const { coachForm } = this.state;
    const { handleAddCoach, coaches } = this.props;

    let count = 0;
    const keyValue = coaches.length + 1;

    for (const key in coachForm) {
      if (coachForm[key] === "") {
        message.error("코치 정보를 입력해주세요");
        break;
      } else {
        count = count + 1;
      }
    }

    if (count >= 3) {
      handleAddCoach({ key: `${keyValue}`, ...coachForm });
      message.success("코치 등록");
      this.setState({
        modalVisible: false,
      });
    }
  };

  handleCheckChange = (selectedRows) => {
    this.setState({
      checkCoach: [...selectedRows],
    });
  };

  render() {
    const { coachForm, loading, select, modalVisible, checkCoach } = this.state;
    const { coaches } = this.props;
    const {
      handleChange,
      handleSubmit,
      handleShowModal,
      handleCancel,
      handleCheckChange,
    } = this;

    return (
      <CoachDetailPresenter
        coachForm={coachForm}
        coaches={coaches}
        loading={loading}
        select={select}
        checkCoach={checkCoach}
        modalVisible={modalVisible}
        handleCheckChange={handleCheckChange}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleShowModal={handleShowModal}
        handleCancel={handleCancel}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoachDetailContainer);
