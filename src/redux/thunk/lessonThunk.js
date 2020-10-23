import * as api from "../../api";
import {
  initLessonInfo,
  addLessonInfo,
  updateLessonInfo,
  deleteLessonInfo,
} from "../actions/lessonActions";

export const thunkGetLessons = () => {
  return async (dispatch, getState) => {
    const response = await api.lesson.getLessons();
    const { data } = response.data;
    console.log("getLessons", data);
    if (response.status === 200 && data.length !== 0) {
      dispatch(initLessonInfo(data));
    }
  };
};
export const thunkGetLessonInfo = (key) => {
  return async (dispatch, getState) => {
    const response = await api.lesson.getLessonInfo(key);
    console.log("response getLessonInfo :>> ", response);
    return response;
  };
};

export const thunkRegisterLesson = (payload) => {
  return async (dispatch, getState) => {
    const response = await api.lesson.registerLessonInfo(payload);
    console.log("response thunkRegisterLesson", response);
    return response;
  };
};

export const thunkRegisterLessonCoach = (payload, id) => {
  return async (dispatch, getState) => {
    const response = await api.lesson.registerLessonCoach(payload, id);
    console.log(
      "rethunkRegisterLessonCoachponthunkRegisterLessonCoache :>> ",
      response
    );
  };
};

export const thunkRegisterLessonMember = (payload, id) => {
  return async (dispatch, getState) => {
    const response = await api.lesson.registerLessonMember(payload, id);
    console.log("thunkRegisterLessonMember :>> ", response);
  };
};

export const thunkUpdateLesson = (payload, id) => {
  return async (dispatch, getState) => {
    const response = await api.lesson.updateLessonInfo(payload, id);
    console.log("response :>> ", response);
  };
};

export const thunkGetLessonDay = (payload) => {
  return async (dispatch, getState) => {
    const response = await api.lesson.getLessonDay(payload);
    console.log("response thunkGetLessonDay :>> ", response);
    return response;
  };
};

export const thunkGetLessonCoaches = (key) => {
  return async (dispatch, getState) => {
    const response = await api.lesson.getLessonCoaches(key);
    console.log("key", key);
    console.log("response coach :>> ", response);
    return response;
  };
};

export const thunkGetLessonMembers = (key) => {
  return async (dispatch, getState) => {
    const response = await api.lesson.getLessonMembers(key);

    console.log("response member :>> ", response);
    return response;
  };
};
