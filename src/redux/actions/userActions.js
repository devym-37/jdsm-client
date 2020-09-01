import * as types from "../types/types";

export const addUserProfile = (user) => ({
  type: types.ADD_USER,
  user,
});
