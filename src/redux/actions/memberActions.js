import * as types from "../types/types";

export const addMemberProfile = (member) => ({
  type: types.ADD_MEMBER,
  member,
});

export const deleteMemberProfile = (member) => ({
  type: types.DELETE_MEMBER,
  member,
});

export const updateMemberProfile = (member) => ({
  type: types.UPDATE_MEMBER,
  member,
});
