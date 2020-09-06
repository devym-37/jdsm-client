import React from "react";
import { connect } from "react-redux";
import CoachPresenter from "./CoachPresenter";
import { addCoachProfile } from "../../redux/actions/coachActions";

import { notification } from "antd";
class CoachContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coachForm: {
        이름: "",
        나이: "",
        연락처: "",
      },
    };
  }

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
    const { coachForm } = this.state;
    const { handleNotification } = this;
    const { handleAddCoach, history } = this.props;

    let submit = false;

    for (const key in coachForm) {
      if (coachForm[key] === "" && key !== "lesson") {
        handleNotification();
        break;
      } else {
        submit = true;
      }
    }
    if (submit) {
      handleAddCoach(coachForm);
      history.push("/");
    }
  };

  render() {
    const { coachForm } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <CoachPresenter
        coachForm={coachForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddCoach: (payload) => dispatch(addCoachProfile(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoachContainer);
