const initialState = {
  coaches: [],
};

const coachReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER": {
      return {
        ...state,
        coaches: [...state.coaches, action.user],
      };
    }
    default: {
      return state;
    }
  }
};

export default coachReducer;
