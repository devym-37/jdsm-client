import * as types from "../types/types";

export const addCoachProfile = (coach) => ({
  type: types.ADD_COACH,
  coach,
});
