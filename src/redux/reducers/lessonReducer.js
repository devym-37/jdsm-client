const initialState = {
  days: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
  lesson: [
    {
      key: "1",
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
      key: "2",
      레슨이름: "두번째",
      레슨코치: ["lee"],
      수강생: ["lee"],
      학교: "45학교",
      학년: "1학년",
      요일: "월요일",
      시간: "14:00",
      레슨비: "20,000",
    },
    {
      key: "3",
      레슨이름: "두번째",
      레슨코치: ["lee"],
      수강생: ["lee"],
      학교: "45학교",
      학년: "1학년",
      요일: "월요일",
      시간: "14:00",
      레슨비: "20,000",
    },
    {
      key: "4",
      레슨이름: "두번째",
      레슨코치: ["lee"],
      수강생: ["lee"],
      학교: "45학교",
      학년: "1학년",
      요일: "월요일",
      시간: "14:00",
      레슨비: "20,000",
    },
    {
      key: "5",
      레슨이름: "두번째",
      레슨코치: ["lee"],
      수강생: ["lee"],
      학교: "45학교",
      학년: "1학년",
      요일: "월요일",
      시간: "14:00",
      레슨비: "20,000",
    },
    {
      key: "6",
      레슨이름: "두번째",
      레슨코치: ["lee"],
      수강생: ["lee"],
      학교: "45학교",
      학년: "1학년",
      요일: "월요일",
      시간: "14:00",
      레슨비: "20,000",
    },
    {
      key: "7",
      레슨이름: "두번째",
      레슨코치: ["lee"],
      수강생: ["lee"],
      학교: "45학교",
      학년: "1학년",
      요일: "월요일",
      시간: "14:00",
      레슨비: "20,000",
    },
    {
      key: "8",
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

    case "UPDATE_LESSON": {
      return {
        ...state,
        lesson: [...updateLesson(state.lesson, action.lesson)],
      };
    }

    case "DELETE_LESSON": {
      return {
        ...state,
        lesson: [...deleteLesson(state.coaches, action.lesson)],
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
          (coach) => coach["key"] !== deleteLesson[i]["key"]
        );
      } else {
        result = data.filter(
          (coach) => coach["key"] !== deleteLesson[i]["key"]
        );
      }
    }

    return result;
  } else {
    result = data.filter((coach) => coach["key"] !== deleteLesson[0]["key"]);

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
