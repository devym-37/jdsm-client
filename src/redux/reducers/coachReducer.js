const initialState = {
  coaches: [
    {
      이름: "kim",
      나이: "23",
      연락처: "111-1111-1111",
    },
    {
      이름: "lee",
      나이: "26",
      연락처: "222-2222-2222",
    },
  ],
};

const coachReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COACH": {
      return {
        ...state,
        coaches: [...state.coaches, action.coach],
      };
    }
    default: {
      return state;
    }
  }
};

export default coachReducer;
