const initialState = {
  days: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
  lesson: [
    {
      레슨이름: "첫번째",
      레슨코치: ["kim"],
      수강생: ["kim", "park"],
      학교: "학교",
      학년: "3학년",
      요일: "월요일",
      시간: "13:00",
      레슨비: "10,000",
    },
    {
      레슨이름: "두번째",
      레슨코치: ["lee"],
      수강생: ["lee"],
      학교: "45학교",
      학년: "1학년",
      요일: "월요일",
      시간: "14:00",
      레슨비: "20,000",
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
