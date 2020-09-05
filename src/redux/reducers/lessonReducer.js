const initialState = {
  days: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
  lesson: [
    {
      lessonName: "첫번째",
      lessonCoach: ["kim"],
      student: ["kim", "park"],
      school: "학교",
      grade: "3학년",
      day: "월요일",
      time: "13:00",
      pay: "10,000",
    },
    {
      lessonName: "두번째",
      lessonCoach: ["lee"],
      student: ["lee"],
      school: "45학교",
      grade: "1학년",
      day: "월요일",
      time: "14:00",
      pay: "20,000",
    },
  ],
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
