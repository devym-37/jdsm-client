import * as api from "../../api";

export const thunkGetCoaches = () => {
  return async (dispatch, getState) => {
    const response = await api.coach.getCoachesInfo();
    console.log("response :>> ", response);
  };
};

export const thunkRegisterCoach = (payload) => {
  return async (dispatch, getState) => {
    const response = await api.coach.registerCoachInfo(payload);
    console.log("response :>> ", response);
  };
};

export const thunkGetCoach = (payload) => {
  return async (dispatch, getState) => {
    const response = await api.coach.getCoachInfo(payload);
    console.log("response :>> ", response);
  };
};

export const thunkUpdateCoach = (payload, id) => {
  return async (dispatch, getState) => {
    const response = await api.coach.updateCoachInfo(payload, id);
    console.log("response :>> ", response);
  };
};
