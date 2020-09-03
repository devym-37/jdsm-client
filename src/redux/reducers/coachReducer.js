const initialState = {
  coaches: [],
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
