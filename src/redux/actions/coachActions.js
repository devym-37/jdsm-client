import * as types from "../types/types";

export const addCoachProfile = (coach) => ({
  type: types.ADD_COACH,
  coach,
});

export const updateCoachProfile = (coach) => ({
  type: types.UPDATE_COACH,
  coach,
});

export const deleteCoachProfile = (coach) => ({
  type: types.DELETE_COACH,
  coach,
});
