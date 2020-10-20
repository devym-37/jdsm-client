const initialState = {
  days: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
  lesson: [],
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_LESSON": {
      return {
        ...state,
        lesson: [...action.lesson],
      };
    }
    case "ADD_LESSON": {
      return {
        ...state,
        lesson: [...state.lesson, action.lesson],
      };
    }

    case "UPDATE_LESSON": {
      return {
        ...state,
        lesson: [...updateLesson(state.lesson, action.lesson)],
      };
    }

    case "DELETE_LESSON": {
      return {
        ...state,
        lesson: [...deleteLesson(state.lesson, action.lesson)],
      };
    }

    default: {
      return state;
    }
  }
};

const deleteLesson = (lessonList, selectLesson) => {
  let data = lessonList;
  const deleteLesson = selectLesson;
  let result = [];
  if (deleteLesson.length > 1) {
    for (let i = 0; i < deleteLesson.length; i++) {
      if (i !== 0) {
        result = result.filter(
          (lesson) => lesson["key"] !== deleteLesson[i]["key"]
        );
      } else {
        result = data.filter(
          (lesson) => lesson["key"] !== deleteLesson[i]["key"]
        );
      }
    }

    return result;
  } else {
    result = data.filter((lesson) => lesson["key"] !== deleteLesson[0]["key"]);
    return result;
  }
};

const updateLesson = (lessonList, updateLesson) => {
  let data = lessonList;
  let update = updateLesson;
  let updateIndex = 0;
  let result = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i]["key"] === update["key"]) {
      updateIndex = i;
      break;
    }
  }
  result = data.splice(updateIndex, 1, update);

  return data;
};

export default lessonReducer;
