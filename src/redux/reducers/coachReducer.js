const initialState = {
  coaches: [
    {
      name: "kim",
      age: "23",
      contact: "111-1111-1111",
    },
    {
      name: "lee",
      age: "26",
      contact: "222-2222-2222",
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
