import * as types from "../types/types";

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
