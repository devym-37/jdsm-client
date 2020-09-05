const initialState = {
  users: [
    {
      name: "lee",
      school: "학교",
      grade: "3학년",
      contact: "000-0000-0000",
      lesson: "",
    },
    {
      name: "kim",
      school: "3학교",
      grade: "3학년",
      contact: "111-1111-1111",
      lesson: "",
    },
    {
      name: "park",
      school: "45학교",
      grade: "1학년",
      contact: "222-2222-2222",
      lesson: "",
    },
  ],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER": {
      return {
        ...state,
        users: [...state.users, action.user],
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
