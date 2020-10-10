import * as api from "../../api";

export const thunkGetMembers = () => {
  return async (dispatch, getState) => {
    const response = await api.member.getMembersInfo();
    console.log("response :>> ", response);
  };
};

export const thunkPostMember = (payload) => {
  return async (dispatch, getState) => {
    const response = await api.member.registerMemberInfo(payload);
    console.log("response :>> ", response);
  };
};

export const thunkGetMember = (payload) => {
  return async (dispatch, getState) => {
    const response = await api.member.getMemberInfo(payload);
    console.log("response :>> ", response);
  };
};
