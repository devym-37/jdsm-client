import * as types from "../types/types";

export const addUserProfile = (user) => ({
  type: types.ADD_USER,
  user,
});

export const deleteUserProfile = (user) => ({
  type: types.DELETE_USER,
  user,
});

export const updateUserProfile = (user) => ({
  type: types.UPDATE_USER,
  user,
});
