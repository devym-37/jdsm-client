import React from "react";
import { connect } from "react-redux";
import MemberPresenter from "./MemberPresenter";
import {
  thunkGetMembers,
  thunkPostMember,
  thunkGetMember,
} from "../../redux/thunk/memberThnuk";
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
    const { members, handleThunkGetMembers } = this.props;
    if (members) {
      this.setState({
        loading: true,
      });
    }
    handleThunkGetMembers();
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

  handleSubmit = async () => {
    const { memberForm } = this.state;
    const {
      members,
      handleThunkPostMember,
      handleThunkGetMembers,
    } = this.props;

    let count = 0;

    for (const key in memberForm) {
      if (
        memberForm[key] === "" &&
        key !== "lesson" &&
        key !== "registrationDate"
      ) {
        message.error("회원 정보를 입력해주세요");
        break;
      } else {
        count = count + 1;
      }
    }

    if (count >= 4) {
      const response = await handleThunkPostMember({
        ...memberForm,
        registrationDate: moment().format("YYYY-MM-DD"),
      });

      if (response === 200) {
        handleThunkGetMembers();
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
      } else {
        message.error("회원 등록 실패");
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

    this.setState({
      checkMember: [],
    });
  };

  handleUpdateMember = () => {
    const { memberForm } = this.state;
    const { handleThunkPostMember, members } = this.props;

    let count = 0;
    const id = memberForm.key;

    for (const key in memberForm) {
      if (memberForm[key] === "" && key !== "lesson") {
        message.error("회원 정보를 입력해주세요");
        break;
      } else {
        count = count + 1;
      }
    }

    if (count >= 4) {
      console.log("memberForm", memberForm); // id로 수정 필드
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
    handleThunkGetMembers: () => dispatch(thunkGetMembers()),
    handleThunkPostMember: (payload) => dispatch(thunkPostMember(payload)),
    handleThunkGetMember: (payload) => dispatch(thunkGetMember(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberContainer);
