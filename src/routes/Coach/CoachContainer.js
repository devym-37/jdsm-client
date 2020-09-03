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
        name: "",
        age: "",
        contact: "",
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
      message: "알림",
      description: "빈칸에 내용을 입력하세요",
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
