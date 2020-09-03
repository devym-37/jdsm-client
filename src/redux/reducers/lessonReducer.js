const initialState = {
  days: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
  lesson: [1, 2, 3],
};

const lessonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LESSON": {
      return {
        ...state,
        lesson: [...state.lesson, action.lesson],
      };
    }
    default: {
      return state;
    }
  }
};

export default lessonReducer;
