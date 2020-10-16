import * as api from "../../api";
import {
  initMemberProfile,
  addMemberProfile,
  deleteMemberProfile,
  updateMemberProfile,
} from "../actions/memberActions";

export const thunkGetMembers = () => {
  return async (dispatch, getState) => {
    const response = await api.member.getMembersInfo();
    const { data } = response.data;

    if (response.status === 200 && data.length !== 0) {
      dispatch(initMemberProfile(data));
    }
  };
};

export const thunkPostMember = (payload) => {
  return async (dispatch, getState) => {
    const response = await api.member.registerMemberInfo(payload);
    console.log("post response", response);
    return response.status;
  };
};

export const thunkGetMember = (payload) => {
  return async (dispatch, getState) => {
    const response = await api.member.getMemberInfo(payload);
    console.log("response 3:>> ", response);
  };
};
