import * as types from "../types/types";

export const addLessonInfo = (lesson) => ({
  type: types.ADD_LESSON,
  lesson,
});
