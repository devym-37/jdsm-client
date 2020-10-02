import React from "react";
import { connect } from "react-redux";
import MemberPresenter from "./MemberPresenter";
import {
  addMemberProfile,
  deleteMemberProfile,
  updateMemberProfile,
} from "../../redux/actions/memberActions";
import moment from "moment";

import { message } from "antd";

class MemberContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      memberForm: {
        name: "",
        registrationDate: "",
        parentName: "",
        contact: "",
        lesson: "",
      },
      modalVisible: false,
      select: "",
      checkMember: [],
      update: false,
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    const { members } = this.props;
    if (members) {
      this.setState({
        loading: true,
      });
    }
  }

  handleShowModal = (e) => {
    this.setState({
      modalVisible: true,
    });
  };

  handleCancel = (e) => {
    this.setState({
      modalVisible: false,
    });
  };

  handleChange = (e) => {
    const { memberForm } = this.state;
    const value = e.target.value;
    const inputName = e.target.name;

    this.setState({
      memberForm: {
        ...memberForm,
        [inputName]: value,
      },
    });
  };

  handleSelect = (value) => {
    const { memberForm } = this.state;
    this.setState({
      memberForm: {
        ...memberForm,
        lesson: value,
      },
      select: value,
    });
  };

  handleSubmit = () => {
    const { memberForm } = this.state;
    const { handleAddMember, members } = this.props;

    let count = 0;
    const keyValue = Number(members[members.length - 1]["key"]) + 1;

    for (const key in memberForm) {
      if (
        memberForm[key] === "" &&
        key !== "lesson" &&
        key !== "registrationDate"
      ) {
        console.log("memberForm :>> ", memberForm);
        message.error("회원 정보를 입력해주세요");
        break;
      } else {
        count = count + 1;
      }
    }

    if (count >= 4) {
      handleAddMember({
        key: keyValue,
        ...memberForm,
        registrationDate: moment().format("YYYY-MM-DD"),
      });
      message.success("회원 등록");
      this.setState({
        modalVisible: false,
        memberForm: {
          name: "",
          registrationDate: "",
          parentName: "",
          contact: "",
          lesson: "",
        },
      });
    }
  };

  handleCheckChange = (selectedRowKeys, selectedRows) => {
    if (selectedRows.length === 1) {
      console.log("selectedRows :>> ", selectedRows);
      this.setState({
        checkMember: [...selectedRows],
        update: true,
        memberForm: selectedRows[0],
        selectedRowKeys: [...selectedRowKeys],
      });
    } else {
      this.setState({
        checkMember: [...selectedRows],
        selectedRowKeys: [...selectedRowKeys],
      });
    }
  };

  handleDeleteMember = () => {
    const { checkMember } = this.state;
    const { handleDelMember } = this.props;
    this.setState({
      checkMember: [],
    });
    handleDelMember(checkMember);
  };

  handleUpdateMember = () => {
    const { memberForm } = this.state;
    const { handleUpdMember } = this.props;

    let count = 0;

    for (const key in memberForm) {
      if (memberForm[key] === "" && key !== "lesson") {
        message.error("회원 정보를 입력해주세요");
        break;
      } else {
        count = count + 1;
      }
    }

    if (count >= 4) {
      handleUpdMember(memberForm);
      message.success("회원 수정");
      this.setState({
        modalVisible: false,
        checkMember: [],
        selectedRowKeys: [],
        memberForm: {
          name: "",
          registrationDate: "",
          parentName: "",
          contact: "",
          lesson: "",
        },
      });
    }
  };

  render() {
    const {
      memberForm,
      loading,
      select,
      modalVisible,
      checkMember,
      update,
      selectedRowKeys,
    } = this.state;
    const { lessons, members } = this.props;
    const {
      handleChange,
      handleSelect,
      handleSubmit,
      handleShowModal,
      handleCancel,
      handleCheckChange,
      handleDeleteMember,
      handleUpdateMember,
    } = this;
    console.log("members :>> ", members);
    return (
      <MemberPresenter
        memberForm={memberForm}
        lessons={lessons}
        members={members}
        loading={loading}
        select={select}
        update={update}
        checkMember={checkMember}
        selectedRowKeys={selectedRowKeys}
        modalVisible={modalVisible}
        handleCheckChange={handleCheckChange}
        handleChange={handleChange}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
        handleShowModal={handleShowModal}
        handleCancel={handleCancel}
        handleDeleteMember={handleDeleteMember}
        handleUpdateMember={handleUpdateMember}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    members: state.memberReducer.members,
    lessons: state.lessonReducer.lesson,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddMember: (payload) => dispatch(addMemberProfile(payload)),
    handleDelMember: (payload) => dispatch(deleteMemberProfile(payload)),
    handleUpdMember: (payload) => dispatch(updateMemberProfile(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberContainer);
