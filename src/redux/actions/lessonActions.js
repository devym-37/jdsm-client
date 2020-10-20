import * as types from "../types/types";

export const initLessonInfo = (lesson) => ({
  type: types.INIT_LESSON,
  lesson,
});

export const addLessonInfo = (lesson) => ({
  type: types.ADD_LESSON,
  lesson,
});

export const updateLessonInfo = (lesson) => ({
  type: types.UPDATE_LESSON,
  lesson,
});

export const deleteLessonInfo = (lesson) => ({
  type: types.DELETE_LESSON,
  lesson,
});
