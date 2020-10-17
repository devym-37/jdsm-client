import * as api from "../../api";
import {
  initCoachProfile,
  addCoachProfile,
  updateCoachProfile,
  deleteCoachProfile,
} from "../actions/coachActions";

export const thunkGetCoaches = () => {
  return async (dispatch, getState) => {
    const response = await api.coach.getCoachesInfo();
    const { data } = response.data;

    if (response.status === 200 && data.length !== 0) {
      dispatch(initCoachProfile(data));
    }
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
    console.log("update coach response :>> ", response);
  };
};
